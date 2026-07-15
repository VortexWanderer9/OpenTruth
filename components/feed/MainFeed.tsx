'use client'

import { useState } from 'react'
import { PostComposer } from './PostComposer'
import { PostCard } from './PostCard'
import { useAccount } from 'wagmi'

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
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      {/* Feed Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Home Feed</h2>
      </div>

      {/* Post Composer */}
      {address && (
        <div className="border-b border-slate-200 dark:border-slate-700">
          <PostComposer onPostCreated={handlePostCreate} />
        </div>
      )}

      {/* Posts List */}
      <div className="flex-1 overflow-auto">
        {posts.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-slate-500 dark:text-slate-400">No posts yet. Be the first to share!</p>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
