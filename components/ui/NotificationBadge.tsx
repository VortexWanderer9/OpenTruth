'use client'

import { motion } from 'framer-motion'
import { scaleIn } from '@/lib/design-system'

interface NotificationBadgeProps {
  count: number
  className?: string
}

export function NotificationBadge({ count, className }: NotificationBadgeProps) {
  if (count === 0) return null

  return (
    <motion.div
      className={`absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-red-500/50 ${className}`}
      variants={scaleIn}
      initial="initial"
      animate="animate"
    >
      {count > 9 ? '9+' : count}
    </motion.div>
  )
}
