'use client'

import Link from 'next/link'
import { useAccount, useDisconnect } from 'wagmi'
import { motion } from 'framer-motion'
import { Home, MessageCircle, Vote, User, LogOut, Settings, Sparkles } from 'lucide-react'
import { fadeInLeft, fadeInUp } from '@/lib/design-system'

export function Sidebar() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

  const navItems = [
    { icon: Home, label: 'Home', href: '/feed' },
    { icon: MessageCircle, label: 'Explore', href: '/explore' },
    { icon: Vote, label: 'Governance', href: '/governance' },
    { icon: Sparkles, label: 'Investigations', href: '/investigations' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <motion.div
      className="h-screen flex flex-col p-4 space-y-6"
      variants={fadeInLeft}
      initial="initial"
      animate="animate"
    >
      {/* Logo */}
      <motion.div
        variants={fadeInUp}
        className="flex items-center gap-3"
      >
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <span className="text-white font-bold text-lg">◎</span>
          </motion.div>
          <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            OpenTruth
          </span>
        </Link>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/10 rounded-xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 transition-all duration-300" />
              <item.icon className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors relative z-10" />
              <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-medium relative z-10">
                {item.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* User Profile Section */}
      <motion.div
        className="space-y-3 border-t border-white/20 pt-4"
        variants={fadeInUp}
      >
        <motion.div
          className="glass p-4 rounded-xl border border-white/20"
          whileHover={{ y: -2 }}
        >
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wider">
            Connected
          </p>
          <p className="text-sm font-mono text-blue-600 dark:text-blue-400 font-bold">{shortAddress}</p>
        </motion.div>
        <motion.button
          onClick={() => disconnect()}
          className="w-full flex items-center gap-2 px-4 py-3 bg-red-100/50 dark:bg-red-900/50 text-red-600 dark:text-red-300 hover:bg-red-200/50 dark:hover:bg-red-800/50 rounded-xl transition text-sm font-semibold border border-red-200 dark:border-red-800"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
