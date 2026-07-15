'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/design-system'
import clsx from 'clsx'
import { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function StatCard({
  label,
  value,
  icon,
  change,
  trend = 'neutral',
  className,
}: StatCardProps) {
  const trendColor =
    trend === 'up'
      ? 'text-green-500'
      : trend === 'down'
        ? 'text-red-500'
        : 'text-slate-500'

  return (
    <motion.div
      className={clsx(
        'glass rounded-xl p-4 backdrop-blur-xl',
        className
      )}
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            {label}
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
          {change && (
            <p className={clsx('text-xs font-semibold mt-2', trendColor)}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  )
}
