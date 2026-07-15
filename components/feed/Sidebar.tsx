'use client'

import Link from 'next/link'
import { useAccount, useDisconnect } from 'wagmi'
import { motion } from 'framer-motion'
import { Home, MessageCircle, Vote, User, LogOut, Settings, Sparkles } from 'lucide-react'

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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col p-5 space-y-6"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-center gap-3"
      >
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center shadow-soft-md"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-bold text-lg">◎</span>
          </motion.div>
          <span className="font-bold text-xl text-gradient group-hover:opacity-80 transition-opacity">
            OpenTruth
          </span>
        </Link>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Link
              href={item.href}
              className="flex items-center gap-3 px-4 py-3.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-indigo-600/0 group-hover:from-primary/10 group-hover:to-indigo-600/10 transition-all duration-300" />
              <item.icon className="w-5 h-5 group-hover:text-primary transition-colors relative z-10" />
              <span className="group-hover:text-primary transition-colors font-medium relative z-10">
                {item.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* User Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="space-y-3 border-t border-border pt-4"
      >
        <motion.div
          className="glass p-4 rounded-xl shadow-soft-sm"
          whileHover={{ y: -2, scale: 1.01 }}
        >
          <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
            Connected
          </p>
          <p className="text-sm font-mono text-primary font-bold">{shortAddress}</p>
        </motion.div>
        <motion.button
          onClick={() => disconnect()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition text-sm font-semibold border border-red-100"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
