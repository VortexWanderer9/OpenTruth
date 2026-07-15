'use client'

import { ReactNode } from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { rainbowConfig } from '@/lib/web3/config'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

// Suppress WalletConnect WebSocket errors in console
if (typeof window !== 'undefined') {
  const originalError = console.error
  console.error = (...args: any[]) => {
    if (
      args[0]?.toString?.().includes?.('WebSocket') ||
      args[0]?.toString?.().includes?.('Project not found')
    ) {
      return
    }
    originalError.apply(console, args)
  }
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={rainbowConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
