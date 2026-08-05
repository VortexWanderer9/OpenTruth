'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, Hash, Users } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { containerVariants, itemVariants } from '@/lib/design-system'

const topics = [
  { name: 'Web3 Development', posts: 1253, trend: 'up' },
  { name: 'Decentralized Finance', posts: 2841, trend: 'up' },
  { name: 'OpenTruth Updates', posts: 892, trend: 'up' },
  { name: 'Governance Proposals', posts: 456, trend: 'neutral' },
  { name: 'Community Discussions', posts: 1645, trend: 'up' },
  { name: 'Technical Insights', posts: 734, trend: 'up' },
]

const communities = [
  { name: 'Web3 Developers', members: 15234, verified: true },
  { name: 'DAO Enthusiasts', members: 8923, verified: true },
  { name: 'OpenTruth Moderators', members: 342, verified: true },
  { name: 'Governance Council', members: 156, verified: true },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTopics = useMemo(
    () =>
      topics.filter((topic) =>
        `${topic.name} ${topic.posts}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  )

  const filteredCommunities = useMemo(
    () =>
      communities.filter((community) =>
        `${community.name} ${community.members}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  )

  return (
  <>
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Explore
          </h1>
          <p className="text-muted-foreground">
            Discover trending topics and communities
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <GlassCard className="flex items-center gap-3 px-6 py-4">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search topics, communities, or creators..."
              className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
            />
          </GlassCard>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trending Topics */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6" />
                Trending Topics
              </h2>
            </motion.div>

            <div className="space-y-3">
              {filteredTopics.map((topic, index) => (
                <motion.div
                  key={topic.name}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                >
                  <GlassCard className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/80">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-indigo-600/20 rounded-xl flex items-center justify-center">
                        <Hash className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {topic.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {topic.posts.toLocaleString()} posts
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm font-semibold ${topic.trend === 'up' ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {topic.trend === 'up' ? '↑ Trending' : 'Stable'}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Communities */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-4">
                <Users className="w-6 h-6" />
                Communities
              </h2>
            </motion.div>

            <div className="space-y-3">
              {filteredCommunities.map((community, index) => (
                <motion.div
                  key={community.name}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                >
                  <GlassCard className="p-4 cursor-pointer hover:bg-white/80">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground">
                        {community.name}
                      </h3>
                      {community.verified && (
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {community.members.toLocaleString()} members
                    </p>
                    <AnimatedButton variant="outline" size="sm" className="w-full">
                      Join
                    </AnimatedButton>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div></>
  )
}
