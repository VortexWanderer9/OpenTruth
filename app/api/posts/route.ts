import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/db'
import { posts, users } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { verifyJWT } from '@/lib/auth/siwe'
import { cookies } from 'next/headers'

// GET /api/posts - Fetch posts feed
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const postsList = await db
      .select()
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset)

    return NextResponse.json(postsList, { status: 200 })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST /api/posts - Create a new post
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
    const { content, ipfsHash } = await request.json()

    if (!content || !ipfsHash) {
      return NextResponse.json(
        { error: 'Content and IPFS hash required' },
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

    // Create post
    const result = await db
      .insert(posts)
      .values({
        authorId: user.id,
        content,
        ipfsHash,
      })
      .returning()

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
