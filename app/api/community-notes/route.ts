import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/db'
import { communityNotes, users, posts } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { verifyJWT } from '@/lib/auth/siwe'
import { cookies } from 'next/headers'

// GET /api/community-notes?postId=1 - Get community notes for a post
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

    const notes = await db
      .select()
      .from(communityNotes)
      .leftJoin(users, eq(communityNotes.authorId, users.id))
      .where(eq(communityNotes.postId, postId))

    return NextResponse.json(notes, { status: 200 })
  } catch (error) {
    console.error('Error fetching community notes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch community notes' },
      { status: 500 }
    )
  }
}

// POST /api/community-notes - Create a community note
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
    const { postId, noteType, content, ipfsHash } = await request.json()

    if (!postId || !noteType || !content || !ipfsHash) {
      return NextResponse.json(
        { error: 'Post ID, note type, content, and IPFS hash required' },
        { status: 400 }
      )
    }

    // Validate note type
    if (!['context', 'dispute', 'correction'].includes(noteType)) {
      return NextResponse.json(
        { error: 'Invalid note type' },
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

    // Create community note
    const result = await db
      .insert(communityNotes)
      .values({
        postId,
        authorId: user.id,
        noteType,
        content,
        ipfsHash,
      })
      .returning()

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating community note:', error)
    return NextResponse.json(
      { error: 'Failed to create community note' },
      { status: 500 }
    )
  }
}
