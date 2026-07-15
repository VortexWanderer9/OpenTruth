'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Heart, MessageCircle, Share2, Image as ImageIcon } from 'lucide-react'
import { uploadPostContent } from '@/lib/web3/ipfs'
import { Button } from '@/components/ui/button'

interface PostComposerProps {
  onPostCreated: (post: any) => void
}

export function PostComposer({ onPostCreated }: PostComposerProps) {
  const { address } = useAccount()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePost = async () => {
    if (!content.trim() || !address) {
      setError('Please enter some content')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Upload to IPFS
      const ipfsHash = await uploadPostContent(content.trim())

      // Create mock post object
      const newPost = {
        id: Date.now(),
        author: {
          id: 1,
          username: `user_${address.slice(2, 8)}`,
          displayName: address,
          avatar: '',
          reputationScore: 100,
          tier: 0,
        },
        content: content.trim(),
        ipfsHash,
        upvotes: 0,
        downvotes: 0,
        comments: 0,
        isFlagged: false,
        createdAt: new Date().toISOString(),
      }

      onPostCreated(newPost)
      setContent('')
    } catch (err) {
      setError('Failed to create post. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="flex gap-4">
        {/* Avatar placeholder */}
        <div className="w-12 h-12 bg-blue-200 dark:bg-blue-900 rounded-full flex-shrink-0"></div>

        {/* Composer */}
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full text-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-transparent resize-none focus:outline-none"
            rows={3}
          />

          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <button className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded-full transition">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded-full transition">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <Button
              onClick={handlePost}
              disabled={!content.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
