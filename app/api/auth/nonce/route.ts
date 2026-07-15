import { generateSiweNonce } from '@/lib/auth/siwe'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const nonce = generateSiweNonce()
    
    return NextResponse.json({ nonce }, { status: 200 })
  } catch (error) {
    console.error('Error generating nonce:', error)
    return NextResponse.json(
      { error: 'Failed to generate nonce' },
      { status: 500 }
    )
  }
}
