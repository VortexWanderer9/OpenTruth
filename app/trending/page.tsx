'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Zap, Award, Activity } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { StatCard } from '@/components/ui/StatCard'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { containerVariants, itemVariants } from '@/lib/design-system'

const trendingPosts = [
  {
    rank: 1,
    author: 'Web3 Researcher',
    title: 'The future of decentralized governance explained',
    engagement: 15243,
    replies: 892,
    shares: 3456,
  },
  {
    rank: 2,
    author: 'OpenTruth Labs',
    title: 'Community voting mechanisms in Web3 platforms',
    engagement: 12856,
    replies: 654,
    shares: 2943,
  },
  {
    rank: 3,
    author: 'Crypto Analyst',
    title: 'Latest blockchain security updates and best practices',
    engagement: 11234,
    replies: 743,
    shares: 2178,
  },
  {
    rank: 4,
    author: 'Developer Hub',
    title: 'Building scalable dApps on Polygon network',
    engagement: 9876,
    replies: 612,
    shares: 1876,
  },
  {
    rank: 5,
    author: 'Community Moderator',
    title: 'Content moderation in decentralized networks',
    engagement: 8654,
    replies: 534,
    shares: 1654,
  },
]

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <TrendingUp className="w-8 h-8" />
            Trending
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            The most engaging content from the OpenTruth community
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              label="Posts Today"
              value="2.3K"
              change="new posts"
              trend="up"
              icon={<Zap className="w-5 h-5" />}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Engagement"
              value="84.2K"
              change="interactions"
              trend="up"
              icon={<Activity className="w-5 h-5" />}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Top Creator"
              value="Web3 Dev"
              change="1.2K followers"
              trend="up"
              icon={<Award className="w-5 h-5" />}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Conversations"
              value="856"
              change="active threads"
              trend="up"
              icon={<Zap className="w-5 h-5" />}
            />
          </motion.div>
        </motion.div>

        {/* Trending Posts */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {trendingPosts.map((post, index) => (
            <motion.div
              key={post.rank}
              variants={itemVariants}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="p-6 cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80 flex gap-6">
                {/* Rank */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <span className="text-white font-bold text-lg">#{post.rank}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {post.author}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    {post.title}
                  </h3>
                  
                  {/* Engagement Stats */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {(post.engagement / 1000).toFixed(1)}K
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">engagement</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span>{post.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span>{post.shares} shares</span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                  <AnimatedButton variant="outline" size="sm">
                    View
                  </AnimatedButton>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatedButton variant="primary">Load more trending posts</AnimatedButton>
        </motion.div>
      </div>
    </div>
  )
}
