'use client'

import { ReactNode } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { fadeInUp, hoverLift } from '@/lib/design-system'
import clsx from 'clsx'

interface AnimatedCardProps extends MotionProps {
  children: ReactNode
  className?: string
  hover?: boolean
  animated?: boolean
  variant?: 'glass' | 'solid' | 'outline'
}

const variantClasses = {
  glass: 'glass border border-white/20',
  solid: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md',
  outline: 'border-2 border-blue-200 dark:border-blue-800 bg-transparent',
}

export function AnimatedCard({
  children,
  className,
  hover = true,
  animated = true,
  variant = 'glass',
  ...motionProps
}: AnimatedCardProps) {
  const classes = clsx(
    'rounded-xl p-6 transition-all duration-300',
    variantClasses[variant],
    hover && 'cursor-pointer hover:shadow-lg',
    className
  )

  return (
    <motion.div
      className={classes}
      variants={animated ? fadeInUp : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
      whileHover={hover ? hoverLift.whileHover : undefined}
      transition={animated ? (fadeInUp.transition as any) : { duration: 0.2 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
