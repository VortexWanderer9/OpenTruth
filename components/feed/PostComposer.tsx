'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Heart, Image as ImageIcon } from 'lucide-react'
import { uploadPostContent } from '@/lib/web3/ipfs'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

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
    <div className="border-b border-border px-6 py-5">
      <div className="flex gap-4">
        {/* Avatar placeholder */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white font-bold shadow-soft-sm">
          {address ? address.charAt(2).toUpperCase() : '?'}
        </div>

        {/* Composer */}
        <div className="flex-1 space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full text-lg text-foreground placeholder-muted-foreground bg-transparent resize-none focus:outline-none leading-relaxed"
            rows={3}
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm"
            >
              {error}
            </motion.p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors"
              >
                <ImageIcon className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handlePost}
                disabled={!content.trim() || isLoading}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-soft-md hover:shadow-soft-lg"
              >
                {isLoading ? 'Posting...' : 'Post'}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
