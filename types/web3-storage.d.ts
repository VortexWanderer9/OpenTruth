declare module 'web3.storage' {
  export interface Web3StorageOptions {
    token: string
    endpoint?: string | URL
    rateLimiter?: any
    fetch?: typeof fetch
  }

  export class Web3Storage {
    constructor(options: Web3StorageOptions)
    put(files: Iterable<File | Blob>, options?: {
      name?: string
      maxRetries?: number
      onRootCidReady?: (cid: string) => void
      onStoredChunk?: (size: number) => void
      wrapWithDirectory?: boolean
      signal?: AbortSignal
    }): Promise<string>
  }
}
