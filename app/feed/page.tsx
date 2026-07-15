'use client'

import { useAccount } from 'wagmi'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/feed/Sidebar'
import { MainFeed } from '@/components/feed/MainFeed'
import { Recommendations } from '@/components/feed/Recommendations'

export default function FeedPage() {
  const { address, isConnected } = useAccount()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isConnected || !address) {
      redirect('/')
    }
    setIsLoading(false)
  }, [isConnected, address])

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex overflow-hidden bg-background">
      {/* Sidebar */}
      <motion.div
        className="w-72 hidden md:block border-r border-border"
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="h-full overflow-hidden">
          <Sidebar />
        </div>
      </motion.div>

      {/* Main Feed */}
      <motion.div
        className="flex-1 overflow-auto border-r border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <MainFeed />
      </motion.div>

      {/* Right Sidebar - Recommendations */}
      <motion.div
        className="w-80 hidden lg:block"
        initial={{ x: 320 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="h-full overflow-hidden">
          <Recommendations />
        </div>
      </motion.div>
    </div>
  )
}
