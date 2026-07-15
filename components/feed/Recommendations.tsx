'use client'

import Link from 'next/link'
import { Users, TrendingUp, Zap } from 'lucide-react'

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
    <div className="h-screen flex flex-col sticky top-0">
      {/* Trending Section */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-slate-900 dark:text-white">Trending</h3>
        </div>

        <div className="space-y-3">
          {TRENDING_TOPICS.map((topic) => (
            <Link
              key={topic.tag}
              href={`/search?q=${topic.tag}`}
              className="block p-3 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded transition"
            >
              <p className="font-semibold text-slate-900 dark:text-white">{topic.tag}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">{topic.posts.toLocaleString()} posts</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Users */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex-1 overflow-auto">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-slate-900 dark:text-white">Recommended</h3>
        </div>

        <div className="space-y-3">
          {RECOMMENDED_USERS.map((user) => (
            <div
              key={user.id}
              className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded hover:bg-slate-100 dark:hover:bg-slate-600/50 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <Link href={`/profile/${user.id}`} className="font-semibold text-slate-900 dark:text-white hover:underline">
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
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">@{user.username}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                  <Zap className="w-3 h-3" />
                  <span>{user.reputationScore} rep</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold transition">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <p>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          {' · '}
          <Link href="/help" className="hover:underline">
            Help
          </Link>
          {' · '}
          <Link href="/tos" className="hover:underline">
            Terms
          </Link>
        </p>
        <p>© 2024 OpenTruth</p>
      </div>
    </div>
  )
}
