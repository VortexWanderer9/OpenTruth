'use client'

import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share2, Vote, Clock, Bell } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { containerVariants, itemVariants } from '@/lib/design-system'

const notifications = [
  {
    id: 1,
    type: 'like',
    actor: 'Alex Chen',
    action: 'liked your post about Web3 governance',
    time: '2 minutes ago',
    icon: Heart,
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    actor: 'Jordan Smith',
    action: 'commented on your investigation',
    time: '15 minutes ago',
    icon: MessageCircle,
    read: false,
  },
  {
    id: 3,
    type: 'vote',
    actor: 'Sam Johnson',
    action: 'voted on your governance proposal',
    time: '1 hour ago',
    icon: Vote,
    read: true,
  },
  {
    id: 4,
    type: 'share',
    actor: '234 users',
    action: 'shared your post in their networks',
    time: '3 hours ago',
    icon: Share2,
    read: true,
  },
  {
    id: 5,
    type: 'vote',
    actor: 'Governance DAO',
    action: 'Your proposal passed with 89% approval',
    time: '5 hours ago',
    icon: Vote,
    read: true,
  },
]

const typeColors = {
  like: 'from-red-500 to-pink-600',
  comment: 'from-blue-500 to-cyan-600',
  vote: 'from-purple-500 to-indigo-600',
  share: 'from-green-500 to-emerald-600',
}

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <Bell className="w-8 h-8" />
              Notifications
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Stay updated with all your activities
            </p>
          </div>
          <AnimatedButton variant="outline">Mark all read</AnimatedButton>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {notifications.map((notification, index) => {
            const Icon = notification.icon
            const [gradient] = Object.entries(typeColors).find(
              ([key]) => key === notification.type
            ) || ['like', typeColors.like]
            return (
              <motion.div
                key={notification.id}
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard
                  className={`p-4 cursor-pointer flex items-start gap-4 ${
                    !notification.read ? 'bg-white/80 dark:bg-slate-800/80' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {notification.actor}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {notification.action}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {notification.time}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Load More */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatedButton variant="outline">Load more notifications</AnimatedButton>
        </motion.div>
      </div>
    </div>
  )
}
