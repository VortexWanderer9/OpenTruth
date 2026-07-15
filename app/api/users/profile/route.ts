import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { verifyJWT } from '@/lib/auth/siwe'
import { cookies } from 'next/headers'

// GET /api/users/profile - Get current user's profile
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { address } = await verifyJWT(token)

    const user = await db.query.users.findFirst({
      where: eq(users.walletAddress, address.toLowerCase()),
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

// PUT /api/users/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { address } = await verifyJWT(token)
    const { displayName, bio, avatar, coverImage } = await request.json()

    const user = await db.query.users.findFirst({
      where: eq(users.walletAddress, address.toLowerCase()),
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const updateData: any = {}
    if (displayName !== undefined) updateData.displayName = displayName
    if (bio !== undefined) updateData.bio = bio
    if (avatar !== undefined) updateData.avatar = avatar
    if (coverImage !== undefined) updateData.coverImage = coverImage
    updateData.updatedAt = new Date()

    const result = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, user.id))
      .returning()

    return NextResponse.json(result[0], { status: 200 })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
