'use client'

import { useAccount } from 'wagmi'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'passed' | 'failed'>('all')

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

  const filteredProposals = MOCK_PROPOSALS.filter((p) => {
    if (filter === 'all') return true
    return p.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
      case 'passed':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
      default:
        return ''
    }
  }

  const getPassPercentage = (forVotes: number, againstVotes: number) => {
    const total = forVotes + againstVotes
    return total > 0 ? Math.round((forVotes / total) * 100) : 0
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">DAO Governance</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Vote on proposals to shape the future of OpenTruth</p>
        </div>
      </nav>

      {/* Header Section */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Stats */}
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Proposals</p>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">3</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">2</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ThumbsUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <p className="text-sm text-slate-600 dark:text-slate-400">Passed</p>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">1</p>
            </div>

            <button className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
              + New Proposal
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex gap-2">
        {(['all', 'active', 'passed', 'failed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Proposals List */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="space-y-4">
          {filteredProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{proposal.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">{proposal.description}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">Created by @{proposal.createdBy}</p>
                </div>
              </div>

              {/* Voting Stats */}
              <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <ThumbsUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">For</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {proposal.forVotes}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <ThumbsDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">Against</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {proposal.againstVotes}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-300 dark:bg-slate-600 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all"
                    style={{ width: `${getPassPercentage(proposal.forVotes, proposal.againstVotes)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  {getPassPercentage(proposal.forVotes, proposal.againstVotes)}% support
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  Vote For
                </button>
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <ThumbsDown className="w-4 h-4" />
                  Vote Against
                </button>
              </div>

              {/* Deadline */}
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-3">Voting ends {proposal.deadline}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
