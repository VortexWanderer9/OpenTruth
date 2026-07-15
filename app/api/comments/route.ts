import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/db'
import { comments, posts, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { verifyJWT } from '@/lib/auth/siwe'
import { cookies } from 'next/headers'

// GET /api/comments?postId=1 - Get comments for a post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = parseInt(searchParams.get('postId') || '0')

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID required' },
        { status: 400 }
      )
    }

    const commentsList = await db
      .select()
      .from(comments)
      .leftJoin(users, eq(comments.authorId, users.id))
      .where(eq(comments.postId, postId))

    return NextResponse.json(commentsList, { status: 200 })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

// POST /api/comments - Create a comment
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { address } = await verifyJWT(token)
    const { postId, content, ipfsHash } = await request.json()

    if (!postId || !content || !ipfsHash) {
      return NextResponse.json(
        { error: 'Post ID, content, and IPFS hash required' },
        { status: 400 }
      )
    }

    // Get user
    const user = await db.query.users.findFirst({
      where: eq(users.walletAddress, address.toLowerCase()),
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Verify post exists
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Create comment
    const result = await db
      .insert(comments)
      .values({
        postId,
        authorId: user.id,
        content,
        ipfsHash,
      })
      .returning()

    // Update post comment count
    await db
      .update(posts)
      .set({ commentCount: post.commentCount + 1 })
      .where(eq(posts.id, postId))

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
