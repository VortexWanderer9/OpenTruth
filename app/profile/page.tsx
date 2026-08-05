'use client'

import { useAccount } from 'wagmi'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
        />
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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Profile</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-soft-sm"
          >
            Edit Profile
          </motion.button>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b border-border">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-primary/40 to-indigo-600/40" />

        {/* Profile Section */}
        <div className="max-w-3xl mx-auto px-6 pb-6">
          {/* Avatar */}
          <div className="flex justify-between items-start -mt-16 mb-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-32 h-32 bg-gradient-to-br from-primary to-indigo-600 rounded-full border-4 border-background flex items-center justify-center shadow-soft-lg"
            >
              <span className="text-5xl text-white font-bold">
                {(user.displayName ?? 'U').charAt(0).toUpperCase()}
              </span>
            </motion.div>
            <div className="flex gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-soft-sm"
              >
                Follow
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-border hover:bg-muted/50 text-foreground px-6 py-2 rounded-full font-semibold transition-all"
              >
                Message
              </motion.button>
            </div>
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 space-y-3"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground">
                {user.displayName}
                {user.tier > 0 && (
                  <span className="ml-2">
                    {user.tier === 1 && '🥉'}
                    {user.tier === 2 && '🥈'}
                    {user.tier === 3 && '🥇'}
                  </span>
                )}
              </h2>
            </div>
            <p className="text-muted-foreground">@{user.username}</p>

            <p className="text-foreground">{user.bio}</p>

            {/* Details */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {user.location}
              </div>
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                {user.website}
              </div>
              <div>{user.joinDate}</div>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="cursor-pointer hover:text-primary transition-colors">
                <div className="font-bold text-foreground">{user.following}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
              <div className="cursor-pointer hover:text-primary transition-colors">
                <div className="font-bold text-foreground">{user.followers}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="cursor-pointer hover:text-primary transition-colors">
                <div className="font-bold text-foreground">{user.posts}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
            </div>

            {/* Reputation */}
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-lg font-bold text-primary">{user.reputationScore.toLocaleString()}</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Reputation Score</p>
                <p className="text-xs text-muted-foreground">
                  Tier {user.tier}: {user.tier === 1 ? 'Engaged' : user.tier === 2 ? 'Trusted' : 'Expert'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-3xl mx-auto border-b border-border p-6 text-center text-muted-foreground">
        <p>User's posts will appear here</p>
      </div>
    </div>
  )
}
