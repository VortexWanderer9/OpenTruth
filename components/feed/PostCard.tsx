'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2, Flag, TrendingUp } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

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
  0: 'text-slate-600 dark:text-slate-400',
  1: 'text-emerald-600 dark:text-emerald-400',
  2: 'text-blue-600 dark:text-blue-400',
  3: 'text-purple-600 dark:text-purple-400',
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
    <div className="border-b border-slate-200 dark:border-slate-700 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition cursor-pointer">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">
          {post.author.displayName.charAt(0).toUpperCase()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/profile/${post.author.id}`} className="font-bold text-slate-900 dark:text-white hover:underline">
              {post.author.displayName}
            </Link>
            <span className={`text-sm font-semibold ${tierColor}`}>
              {tierLabel}
            </span>
            <span className="text-slate-500 dark:text-slate-400">@{post.author.username}</span>
            <span className="text-slate-500 dark:text-slate-400">·</span>
            <span className="text-slate-500 dark:text-slate-400 text-sm">{timeAgo}</span>

            {post.isFlagged && (
              <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded-full">
                ⚠️ Flagged
              </span>
            )}
          </div>

          {/* Reputation Info */}
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>{post.author.reputationScore} reputation</span>
          </div>

          {/* Content */}
          <p className="text-base text-slate-900 dark:text-white mt-3 whitespace-pre-wrap break-words">
            {post.content}
          </p>

          {/* Engagement Stats */}
          <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400 mt-3">
            <span>{post.comments} comments</span>
            <span>{upvotes} upvotes</span>
            <span>{downvotes} downvotes</span>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-3 max-w-md text-slate-500 dark:text-slate-400">
            <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded transition group">
              <MessageCircle className="w-4 h-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 rounded-full p-1 w-8 h-8" />
              <span className="text-xs">{post.comments}</span>
            </button>

            <button
              onClick={handleUpvote}
              className={`flex items-center gap-2 px-3 py-2 rounded transition group ${
                hasUpvoted
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              <Heart
                className={`w-4 h-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900 rounded-full p-1 w-8 h-8 transition ${
                  hasUpvoted ? 'fill-current' : ''
                }`}
              />
              <span className="text-xs">{upvotes}</span>
            </button>

            <button
              onClick={handleDownvote}
              className={`flex items-center gap-2 px-3 py-2 rounded transition group ${
                hasDownvoted
                  ? 'text-red-600 dark:text-red-400'
                  : 'hover:text-red-600 dark:hover:text-red-400'
              }`}
            >
              <Heart
                className={`w-4 h-4 group-hover:bg-red-100 dark:group-hover:bg-red-900 rounded-full p-1 w-8 h-8 transition transform ${
                  hasDownvoted ? 'fill-current rotate-180' : 'rotate-180'
                }`}
              />
              <span className="text-xs">{downvotes}</span>
            </button>

            <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded transition group">
              <Share2 className="w-4 h-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 rounded-full p-1 w-8 h-8" />
            </button>

            <button className="flex items-center gap-2 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded transition group">
              <Flag className="w-4 h-4 group-hover:bg-red-100 dark:group-hover:bg-red-900 rounded-full p-1 w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
