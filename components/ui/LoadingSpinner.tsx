'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'ghost'
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
}

const colorClasses = {
  primary: 'border-blue-600/30 border-t-blue-600',
  ghost: 'border-slate-300 dark:border-slate-700 border-t-slate-900 dark:border-t-white',
}

export function LoadingSpinner({ size = 'md', variant = 'primary' }: LoadingSpinnerProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`rounded-full ${sizeClasses[size]} ${colorClasses[variant]}`}
    />
  )
}
