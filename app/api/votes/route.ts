import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/db'
import { postVotes, posts, users } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { verifyJWT } from '@/lib/auth/siwe'
import { cookies } from 'next/headers'

// POST /api/votes - Vote on a post
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
    const { postId, voteType } = await request.json()

    if (!postId || !voteType) {
      return NextResponse.json(
        { error: 'Post ID and vote type required' },
        { status: 400 }
      )
    }

    if (!['upvote', 'downvote'].includes(voteType)) {
      return NextResponse.json(
        { error: 'Invalid vote type' },
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

    // Check if user already voted
    const existingVote = await db.query.postVotes.findFirst({
      where: and(
        eq(postVotes.postId, postId),
        eq(postVotes.voterId, user.id)
      ),
    })

    if (existingVote) {
      // Remove existing vote
      await db.delete(postVotes).where(
        and(
          eq(postVotes.postId, postId),
          eq(postVotes.voterId, user.id)
        )
      )

      // Update post vote counts
      if (existingVote.voteType === 'upvote') {
        await db
          .update(posts)
          .set({ upvotes: Math.max(0, post.upvotes - 1) })
          .where(eq(posts.id, postId))
      } else {
        await db
          .update(posts)
          .set({ downvotes: Math.max(0, post.downvotes - 1) })
          .where(eq(posts.id, postId))
      }

      // If same vote type, return (toggle off)
      if (existingVote.voteType === voteType) {
        return NextResponse.json({ success: true, action: 'removed' })
      }
    }

    // Add new vote
    const result = await db
      .insert(postVotes)
      .values({
        postId,
        voterId: user.id,
        voteType,
      })
      .returning()

    // Update post vote counts
    if (voteType === 'upvote') {
      await db
        .update(posts)
        .set({ upvotes: post.upvotes + 1 })
        .where(eq(posts.id, postId))
    } else {
      await db
        .update(posts)
        .set({ downvotes: post.downvotes + 1 })
        .where(eq(posts.id, postId))
    }

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error voting:', error)
    return NextResponse.json(
      { error: 'Failed to vote' },
      { status: 500 }
    )
  }
}
