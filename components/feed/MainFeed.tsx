'use client'

import { useState } from 'react'
import { PostComposer } from './PostComposer'
import { PostCard } from './PostCard'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'

// Mock data for demonstration
const MOCK_POSTS = [
  {
    id: 1,
    author: {
      id: 1,
      username: 'alice',
      displayName: 'Alice Smith',
      avatar: '',
      reputationScore: 1250,
      tier: 2,
    },
    content: 'Just joined OpenTruth! Excited to be part of a decentralized social network where community governance matters.',
    ipfsHash: 'QmExample1',
    upvotes: 234,
    downvotes: 5,
    comments: 12,
    isFlagged: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    author: {
      id: 2,
      username: 'bob',
      displayName: 'Bob Johnson',
      avatar: '',
      reputationScore: 850,
      tier: 1,
    },
    content: 'Web3 social networks are the future. The ability to own your data and participate in governance is game-changing.',
    ipfsHash: 'QmExample2',
    upvotes: 456,
    downvotes: 23,
    comments: 45,
    isFlagged: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
]

export function MainFeed() {
  const { address } = useAccount()
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [isComposing, setIsComposing] = useState(false)

  const handlePostCreate = (newPost: any) => {
    setPosts([newPost, ...posts])
    setIsComposing(false)
  }

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col">
      {/* Feed Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4"
      >
        <h2 className="text-2xl font-bold text-foreground">Home Feed</h2>
      </motion.div>

      {/* Post Composer */}
      {address && <PostComposer onPostCreated={handlePostCreate} />}

      {/* Posts List */}
      <div className="flex-1 overflow-auto">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 gap-3">
            <p className="text-muted-foreground text-lg">No posts yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="space-y-0">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
