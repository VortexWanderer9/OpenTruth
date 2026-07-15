import { generateNonce, SiweMessage } from 'siwe'
import { jwtVerify, SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

/**
 * Generate a nonce for SIWE authentication
 */
export function generateSiweNonce(): string {
  return generateNonce()
}

/**
 * Create a SIWE message
 */
export function createSiweMessage(
  address: string,
  nonce: string,
  chainId: number = 137 // Polygon mainnet
): SiweMessage {
  return new SiweMessage({
    domain: typeof window !== 'undefined' ? window.location.host : 'localhost:3000',
    address,
    statement: 'Sign in with Ethereum to OpenTruth',
    uri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
    version: '1',
    chainId,
    nonce,
  })
}

/**
 * Verify a SIWE message
 */
export async function verifySiweMessage(
  message: string,
  signature: string
): Promise<{ address: string; chainId: number }> {
  try {
    const siweMessage = new SiweMessage(message)
    const fields = await siweMessage.verify({
      signature,
      provider: undefined, // Would use ethers provider in real implementation
    })
    
    return {
      address: fields.data.address,
      chainId: fields.data.chainId,
    }
  } catch (error) {
    console.error('SIWE verification error:', error)
    throw new Error('Failed to verify SIWE message')
  }
}

/**
 * Create a JWT token
 */
export async function createJWT(
  address: string,
  expiresIn: number = 7 * 24 * 60 * 60 // 7 days
): Promise<string> {
  const token = await new SignJWT({ address })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn)
    .sign(JWT_SECRET)
  
  return token
}

/**
 * Verify a JWT token
 */
export async function verifyJWT(token: string): Promise<{ address: string }> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return {
      address: verified.payload.address as string,
    }
  } catch (error) {
    console.error('JWT verification error:', error)
    throw new Error('Invalid or expired token')
  }
}
