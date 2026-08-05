'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ThumbsUp, ThumbsDown, Users, Clock } from 'lucide-react'

interface Proposal {
  id: number
  title: string
  description: string
  status: 'active' | 'passed' | 'failed'
  forVotes: number
  againstVotes: number
  deadline: string
  createdBy: string
}

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 1,
    title: 'Increase reputation threshold for tier 2',
    description: 'Propose increasing the reputation threshold for tier 2 membership from 500 to 750 to ensure community moderation quality.',
    status: 'active',
    forVotes: 234,
    againstVotes: 45,
    deadline: '2024-02-20',
    createdBy: 'alice',
  },
  {
    id: 2,
    title: 'Add USDC rewards for quality posts',
    description: 'Implement a mechanism to reward high-quality posts with USDC tokens on Polygon.',
    status: 'active',
    forVotes: 456,
    againstVotes: 123,
    deadline: '2024-02-25',
    createdBy: 'bob',
  },
  {
    id: 3,
    title: 'Implement post rate limiting',
    description: 'Add a 15-minute rate limit between posts to prevent spam.',
    status: 'passed',
    forVotes: 789,
    againstVotes: 234,
    deadline: '2024-02-15',
    createdBy: 'charlie',
  },
]

export default function GovernancePage() {
  const { address, isConnected } = useAccount()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'passed' | 'failed'>('all')

  useEffect(() => {
    if (!isConnected || !address) {
      router.push('/')
    }
    setIsLoading(false)
  }, [isConnected, address, router])

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

  const filteredProposals = MOCK_PROPOSALS.filter((p) => {
    if (filter === 'all') return true
    return p.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-50 text-blue-700 border border-blue-100'
      case 'passed':
        return 'bg-green-50 text-green-700 border border-green-100'
      case 'failed':
        return 'bg-red-50 text-red-700 border border-red-100'
      default:
        return ''
    }
  }

  const getPassPercentage = (forVotes: number, againstVotes: number) => {
    const total = forVotes + againstVotes
    return total > 0 ? Math.round((forVotes / total) * 100) : 0
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-10 backdrop-blur-xl bg-background/80">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-foreground">DAO Governance</h1>
          <p className="text-muted-foreground mt-1">Vote on proposals to shape the future of OpenTruth</p>
        </div>
      </nav>

      {/* Header Section */}
      <div className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Stats */}
            <div className="p-5 bg-muted/30 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <p className="text-sm text-muted-foreground">Total Proposals</p>
              </div>
              <p className="text-3xl font-bold text-foreground">3</p>
            </div>

            <div className="p-5 bg-muted/30 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <p className="text-3xl font-bold text-foreground">2</p>
            </div>

            <div className="p-5 bg-muted/30 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <ThumbsUp className="w-5 h-5 text-green-600" />
                <p className="text-sm text-muted-foreground">Passed</p>
              </div>
              <p className="text-3xl font-bold text-foreground">1</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-5 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all shadow-soft-md"
            >
              + New Proposal
            </motion.button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-6 py-5 flex gap-2">
        {(['all', 'active', 'passed', 'failed'] as const).map((f) => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter(f)}
            className={`px-5 py-2.5 rounded-xl font-medium transition capitalize ${
              filter === f
                ? 'bg-primary text-white shadow-soft-md'
                : 'bg-muted/30 text-foreground border border-border hover:bg-muted/50'
            }`}
          >
            {f}
          </motion.button>
        ))}
      </div>

      {/* Proposals List */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="space-y-4">
          {filteredProposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-background border border-border rounded-xl p-6 hover:shadow-soft-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-foreground">{proposal.title}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{proposal.description}</p>
                  <p className="text-sm text-muted-foreground">Created by @{proposal.createdBy}</p>
                </div>
              </div>

              {/* Voting Stats */}
              <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-foreground">For</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      {proposal.forVotes}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <ThumbsDown className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-semibold text-foreground">Against</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600">
                      {proposal.againstVotes}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-green-500 h-full transition-all"
                    style={{ width: `${getPassPercentage(proposal.forVotes, proposal.againstVotes)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {getPassPercentage(proposal.forVotes, proposal.againstVotes)}% support
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-soft-sm"
                >
                  <ThumbsUp className="w-4 h-4" />
                  Vote For
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-soft-sm"
                >
                  <ThumbsDown className="w-4 h-4" />
                  Vote Against
                </motion.button>
              </div>

              {/* Deadline */}
              <p className="text-xs text-muted-foreground mt-3">Voting ends {proposal.deadline}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
