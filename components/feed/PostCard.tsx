'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2, Flag, TrendingUp } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface PostCardProps {
  post: {
    id: number
    author: {
      id: number
      username: string
      displayName: string
      avatar: string
      reputationScore: number
      tier: number
    }
    content: string
    ipfsHash: string
    upvotes: number
    downvotes: number
    comments: number
    isFlagged: boolean
    createdAt: string
  }
}

const TIER_COLORS = {
  0: 'text-muted-foreground',
  1: 'text-emerald-600',
  2: 'text-primary',
  3: 'text-purple-600',
}

const TIER_LABELS = {
  0: '',
  1: '🥉 Tier 1',
  2: '🥈 Tier 2',
  3: '🥇 Tier 3',
}

export function PostCard({ post }: PostCardProps) {
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [hasDownvoted, setHasDownvoted] = useState(false)
  const [upvotes, setUpvotes] = useState(post.upvotes)
  const [downvotes, setDownvotes] = useState(post.downvotes)

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes(upvotes - 1)
      setHasUpvoted(false)
    } else {
      setUpvotes(upvotes + 1)
      setHasUpvoted(true)
      if (hasDownvoted) {
        setDownvotes(downvotes - 1)
        setHasDownvoted(false)
      }
    }
  }

  const handleDownvote = () => {
    if (hasDownvoted) {
      setDownvotes(downvotes - 1)
      setHasDownvoted(false)
    } else {
      setDownvotes(downvotes + 1)
      setHasDownvoted(true)
      if (hasUpvoted) {
        setUpvotes(upvotes - 1)
        setHasUpvoted(false)
      }
    }
  }

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
  const tierLabel = TIER_LABELS[post.author.tier as keyof typeof TIER_LABELS]
  const tierColor = TIER_COLORS[post.author.tier as keyof typeof TIER_COLORS]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="border-b border-border px-6 py-5 hover:bg-muted/40 transition-colors cursor-pointer"
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white font-bold shadow-soft-sm">
          {post.author.displayName.charAt(0).toUpperCase()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/profile/${post.author.id}`}
              className="font-semibold text-foreground hover:underline hover:text-primary transition-colors"
            >
              {post.author.displayName}
            </Link>
            {tierLabel && (
              <span className={`text-xs font-semibold ${tierColor}`}>
                {tierLabel}
              </span>
            )}
            <span className="text-muted-foreground">@{post.author.username}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground text-sm">{timeAgo}</span>

            {post.isFlagged && (
              <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">
                ⚠️ Flagged
              </span>
            )}
          </div>

          {/* Reputation Info */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{post.author.reputationScore.toLocaleString()} reputation</span>
          </div>

          {/* Content */}
          <p className="text-base text-foreground whitespace-pre-wrap break-words leading-relaxed">
            {post.content}
          </p>

          {/* Engagement Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments} comments</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4" />
              <span>{upvotes} upvotes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs">⬇️</span>
              <span>{downvotes} downvotes</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.08)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs font-medium">{post.comments}</span>
            </motion.button>

            <motion.button
              onClick={handleUpvote}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(16, 185, 129, 0.08)' }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
                hasUpvoted
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-muted-foreground hover:text-emerald-600'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${hasUpvoted ? 'fill-current' : ''}`}
              />
              <span className="text-xs font-medium">{upvotes}</span>
            </motion.button>

            <motion.button
              onClick={handleDownvote}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.08)' }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
                hasDownvoted
                  ? 'text-red-600 bg-red-50'
                  : 'text-muted-foreground hover:text-red-600'
              }`}
            >
              <Heart
                className={`w-5 h-5 rotate-180 ${hasDownvoted ? 'fill-current' : ''}`}
              />
              <span className="text-xs font-medium">{downvotes}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.08)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-muted-foreground hover:text-primary transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.08)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-muted-foreground hover:text-red-600 transition-colors ml-auto"
            >
              <Flag className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
