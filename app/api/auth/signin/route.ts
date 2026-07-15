import { NextRequest, NextResponse } from 'next/server'
import { verifySiweMessage, createJWT } from '@/lib/auth/siwe'
import { db } from '@/lib/db/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { message, signature } = await request.json()

    if (!message || !signature) {
      return NextResponse.json(
        { error: 'Message and signature required' },
        { status: 400 }
      )
    }

    // Verify SIWE message
    const { address } = await verifySiweMessage(message, signature)

    // Check if user exists
    let user = await db.query.users.findFirst({
      where: eq(users.walletAddress, address.toLowerCase()),
    })

    // Create user if doesn't exist
    if (!user) {
      const username = `user_${address.slice(2, 8)}`
      const result = await db
        .insert(users)
        .values({
          walletAddress: address.toLowerCase(),
          username: username,
          displayName: username,
        })
        .returning()

      user = result[0]
    }

    // Create JWT token
    const token = await createJWT(address.toLowerCase())

    // Set secure HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          username: user.username,
          displayName: user.displayName,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Sign in error:', error)
    return NextResponse.json(
      { error: 'Failed to sign in' },
      { status: 500 }
    )
  }
}
