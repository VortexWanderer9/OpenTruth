'use client'

import { ReactNode } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { fadeInUp, hoverLift } from '@/lib/design-system'
import clsx from 'clsx'

interface GlassCardProps extends MotionProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  animated?: boolean
  onClick?: () => void
}

export function GlassCard({
  children,
  className,
  hoverable = true,
  animated = true,
  onClick,
  ...motionProps
}: GlassCardProps) {
  const classes = clsx(
    'glass rounded-2xl p-6 border border-white/20',
    hoverable && 'cursor-pointer transition-all duration-300 hover:border-white/40 hover:shadow-lg',
    className
  )

  return (
    <motion.div
      className={classes}
      variants={animated ? fadeInUp : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
      whileHover={hoverable ? hoverLift.whileHover : undefined}
      transition={animated ? (fadeInUp.transition as any) : undefined}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
