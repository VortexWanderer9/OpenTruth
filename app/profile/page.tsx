'use client'

import { useAccount } from 'wagmi'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Mail, MapPin, Link as LinkIcon, Zap, TrendingUp } from 'lucide-react'

export default function ProfilePage() {
  const { address, isConnected } = useAccount()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isConnected || !address) {
      redirect('/')
    }
    setIsLoading(false)
  }, [isConnected, address])

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Mock user data
  const user = {
    username: `user_${address?.slice(2, 8)}`,
    displayName: address,
    bio: 'Web3 enthusiast and OpenTruth pioneer',
    location: 'Decentralized',
    website: 'opentruth.web3',
    reputationScore: 1250,
    tier: 2,
    followers: 342,
    following: 156,
    posts: 45,
    joinDate: 'Joined January 2024',
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 bg-white dark:bg-slate-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Profile</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition">
            Edit Profile
          </button>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-600"></div>

        {/* Profile Section */}
        <div className="max-w-2xl mx-auto px-4 pb-6">
          {/* Avatar */}
          <div className="flex justify-between items-start -mt-16 mb-4">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center">
              <span className="text-6xl text-white font-bold">
                {user.displayName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition">
                Follow
              </button>
              <button className="border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white px-6 py-2 rounded-full font-semibold transition">
                Message
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="mb-6">
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {user.displayName}
                {user.tier > 0 && <span className="ml-2">{user.tier === 1 ? '🥉' : user.tier === 2 ? '🥈' : '🥇'}</span>}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">@{user.username}</p>
            </div>

            <p className="text-slate-900 dark:text-white mb-4">{user.bio}</p>

            {/* Details */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {user.location}
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="w-4 h-4" />
                {user.website}
              </div>
              <div>{user.joinDate}</div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-4">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{user.following}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Following</div>
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{user.followers}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Followers</div>
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{user.posts}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Posts</div>
              </div>
            </div>

            {/* Reputation */}
            <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{user.reputationScore}</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Reputation Score</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Tier {user.tier}: {user.tier === 1 ? 'Engaged' : user.tier === 2 ? 'Trusted' : 'Expert'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-2xl mx-auto border-b border-slate-200 dark:border-slate-700 p-4 text-center text-slate-600 dark:text-slate-400">
        <p>User&apos;s posts will appear here</p>
      </div>
    </div>
  )
}
