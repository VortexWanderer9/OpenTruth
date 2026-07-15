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
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Sidebar */}
      <motion.div
        className="w-64 hidden md:block"
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="glass border-r border-white/20 backdrop-blur-xl h-full overflow-hidden">
          <Sidebar />
        </div>
      </motion.div>

      {/* Main Feed */}
      <motion.div
        className="flex-1 overflow-auto"
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
        <div className="glass border-l border-white/20 backdrop-blur-xl h-full overflow-hidden">
          <Recommendations />
        </div>
      </motion.div>
    </div>
  )
}
