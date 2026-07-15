'use client'

import Link from 'next/link'
import { Users, TrendingUp, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const RECOMMENDED_USERS = [
  {
    id: 1,
    username: 'alice',
    displayName: 'Alice Smith',
    reputationScore: 1250,
    tier: 2,
  },
  {
    id: 2,
    username: 'bob',
    displayName: 'Bob Johnson',
    reputationScore: 850,
    tier: 1,
  },
  {
    id: 3,
    username: 'charlie',
    displayName: 'Charlie Brown',
    reputationScore: 2500,
    tier: 3,
  },
]

const TRENDING_TOPICS = [
  { tag: '#Web3', posts: 2345 },
  { tag: '#Decentralization', posts: 1856 },
  { tag: '#DAO', posts: 1234 },
  { tag: '#Blockchain', posts: 998 },
]

export function Recommendations() {
  return (
    <div className="h-full flex flex-col sticky top-0">
      {/* Trending Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 border-b border-border"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground text-lg">Trending</h3>
        </div>

        <div className="space-y-3">
          {TRENDING_TOPICS.map((topic, index) => (
            <motion.div
              key={topic.tag}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
            >
              <Link
                href={`/search?q=${topic.tag}`}
                className="block p-3 rounded-xl hover:bg-muted/60 transition-colors"
              >
                <p className="font-semibold text-foreground">{topic.tag}</p>
                <p className="text-xs text-muted-foreground">{topic.posts.toLocaleString()} posts</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommended Users */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="p-5 border-b border-border flex-1 overflow-auto"
      >
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground text-lg">Recommended</h3>
        </div>

        <div className="space-y-3">
          {RECOMMENDED_USERS.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
              className="p-3.5 bg-muted/30 rounded-xl hover:bg-muted/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <Link href={`/profile/${user.id}`} className="font-semibold text-foreground hover:underline hover:text-primary transition-colors">
                  {user.displayName}
                </Link>
                {user.tier > 0 && (
                  <span className="text-xs font-semibold">
                    {user.tier === 1 && '🥉'}
                    {user.tier === 2 && '🥈'}
                    {user.tier === 3 && '🥇'}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-2">@{user.username}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{user.reputationScore.toLocaleString()} rep</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-full text-xs font-semibold transition-all shadow-soft-sm hover:shadow-soft-md"
                >
                  Follow
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-5 border-t border-border text-xs text-muted-foreground space-y-2"
      >
        <p>
          <Link href="/about" className="hover:underline hover:text-foreground transition-colors">
            About
          </Link>
          {' · '}
          <Link href="/help" className="hover:underline hover:text-foreground transition-colors">
            Help
          </Link>
          {' · '}
          <Link href="/tos" className="hover:underline hover:text-foreground transition-colors">
            Terms
          </Link>
        </p>
        <p className="font-medium">© 2026 OpenTruth</p>
      </motion.div>
    </div>
  )
}
