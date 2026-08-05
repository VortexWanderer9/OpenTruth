import { Web3Storage } from 'web3.storage/dist/src/lib.js'
import { IPFS_GATEWAYS } from './config'

// Initialize Web3.Storage client
const web3StorageToken = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN

if (!web3StorageToken) {
  console.warn('WEB3_STORAGE_TOKEN not set - IPFS uploads will fail')
}

const getWeb3StorageClient = () => {
  if (!web3StorageToken) {
    throw new Error('WEB3_STORAGE_TOKEN environment variable is required')
  }
  return new Web3Storage({ token: web3StorageToken })
}

/**
 * Upload content to IPFS via Web3.Storage
 * @param fileName - Name of the file
 * @param content - Content to upload (string or Buffer)
 * @returns IPFS hash
 */
export async function uploadToIPFS(
  fileName: string,
  content: string | Buffer
): Promise<string> {
  try {
    const client = getWeb3StorageClient()
    
    // Create a Blob from the content
    const blob = new Blob([content], { type: 'application/json' })
    const file = new File([blob], fileName, { type: 'application/json' })
    
    // Upload to Web3.Storage
    const cid = await client.put([file], {
      name: fileName,
      maxRetries: 3,
    })
    
    return cid
  } catch (error) {
    console.error('IPFS upload error:', error)
    throw new Error(`Failed to upload to IPFS: ${error}`)
  }
}

/**
 * Get IPFS content URL
 * @param hash - IPFS hash (CID)
 * @returns Full IPFS URL
 */
export function getIPFSUrl(hash: string): string {
  if (!hash) return ''
  // Use the first gateway
  return `${IPFS_GATEWAYS[0]}/${hash}`
}

/**
 * Fetch content from IPFS
 * @param hash - IPFS hash (CID)
 * @returns Parsed JSON content
 */
export async function fetchFromIPFS<T>(hash: string): Promise<T> {
  if (!hash) {
    throw new Error('IPFS hash is required')
  }
  
  // Try each gateway in sequence
  for (const gateway of IPFS_GATEWAYS) {
    try {
      const url = `${gateway}/${hash}`
      const response = await fetch(url, { cache: 'force-cache' })
      
      if (!response.ok) {
        continue
      }
      
      return await response.json()
    } catch (error) {
      // Try next gateway
      continue
    }
  }
  
  throw new Error(`Failed to fetch from IPFS: ${hash}`)
}

/**
 * Upload post content to IPFS
 */
export async function uploadPostContent(
  content: string,
  mentionedUsers?: string[],
  hashtags?: string[]
) {
  const postData = {
    content,
    mentionedUsers: mentionedUsers || [],
    hashtags: hashtags || [],
    timestamp: new Date().toISOString(),
  }
  
  return uploadToIPFS(`post-${Date.now()}.json`, JSON.stringify(postData))
}

/**
 * Upload comment content to IPFS
 */
export async function uploadCommentContent(
  content: string,
  postId: number,
  parentCommentId?: number
) {
  const commentData = {
    content,
    postId,
    parentCommentId,
    timestamp: new Date().toISOString(),
  }
  
  return uploadToIPFS(`comment-${Date.now()}.json`, JSON.stringify(commentData))
}

/**
 * Upload community note to IPFS
 */
export async function uploadCommunityNote(
  content: string,
  noteType: 'context' | 'dispute' | 'correction',
  references?: string[]
) {
  const noteData = {
    content,
    noteType,
    references: references || [],
    timestamp: new Date().toISOString(),
  }
  
  return uploadToIPFS(`note-${Date.now()}.json`, JSON.stringify(noteData))
}
