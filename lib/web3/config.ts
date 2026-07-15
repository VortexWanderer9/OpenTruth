import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { polygon } from 'viem/chains'

// Smart contract addresses (these should be updated after contract deployment)
export const CONTRACTS = {
  REPUTATION_TOKEN: process.env.NEXT_PUBLIC_REPUTATION_TOKEN || '0x0000000000000000000000000000000000000000',
  GOVERNANCE_DAO: process.env.NEXT_PUBLIC_GOVERNANCE_DAO || '0x0000000000000000000000000000000000000000',
  CONTENT_REGISTRY: process.env.NEXT_PUBLIC_CONTENT_REGISTRY || '0x0000000000000000000000000000000000000000',
}

// RPC URLs
export const RPC_URLS = {
  POLYGON: process.env.NEXT_PUBLIC_POLYGON_RPC || 'https://polygon-rpc.com',
}

// Web3.Storage token for IPFS uploads
export const WEB3_STORAGE_TOKEN = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN || ''

// Rainbow Kit configuration
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

export const rainbowConfig = getDefaultConfig({
  appName: 'OpenTruth',
  projectId: projectId || 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', // Placeholder for demo/development
  chains: [polygon],
  ssr: true,
})

// Gateway URLs for IPFS content
export const IPFS_GATEWAYS = [
  'https://w3s.link/ipfs',
  'https://ipfs.io/ipfs',
  'https://cloudflare-ipfs.com/ipfs',
]

export const getIpfsUrl = (hash: string) => {
  return `${IPFS_GATEWAYS[0]}/${hash}`
}
