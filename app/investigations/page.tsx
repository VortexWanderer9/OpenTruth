'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Clock, MessageSquare } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { StatCard } from '@/components/ui/StatCard'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { containerVariants, itemVariants } from '@/lib/design-system'

const investigations = [
  {
    id: 1,
    title: 'Verifying COVID-19 vaccine information',
    status: 'active',
    contributorsCount: 156,
    notesCount: 42,
    helpfulVotes: 1243,
    image: '/img/investigation-1.jpg',
  },
  {
    id: 2,
    title: 'Fact-checking climate change claims',
    status: 'active',
    contributorsCount: 234,
    notesCount: 67,
    helpfulVotes: 2156,
    image: '/img/investigation-2.jpg',
  },
  {
    id: 3,
    title: 'Election transparency investigation',
    status: 'completed',
    contributorsCount: 189,
    notesCount: 34,
    helpfulVotes: 1876,
    image: '/img/investigation-3.jpg',
  },
  {
    id: 4,
    title: 'Tech industry practices review',
    status: 'active',
    contributorsCount: 201,
    notesCount: 53,
    helpfulVotes: 1654,
    image: '/img/investigation-4.jpg',
  },
]

export default function InvestigationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Investigations
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Community-driven fact-checking and investigations
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              label="Active"
              value="12"
              change="investigations"
              trend="up"
              icon={<AlertCircle className="w-5 h-5" />}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Contributors"
              value="2.3K"
              change="verified"
              trend="up"
              icon={<MessageSquare className="w-5 h-5" />}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Completed"
              value="34"
              change="this month"
              trend="up"
              icon={<CheckCircle className="w-5 h-5" />}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="In Progress"
              value="8"
              change="pending votes"
              trend="neutral"
              icon={<Clock className="w-5 h-5" />}
            />
          </motion.div>
        </motion.div>

        {/* Investigations Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {investigations.map((investigation, index) => (
            <motion.div
              key={investigation.id}
              variants={itemVariants}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="overflow-hidden flex flex-col h-full cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      investigation.status === 'active'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-600'
                    }`}
                  >
                    {investigation.status === 'active' ? 'Active' : 'Completed'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  {investigation.title}
                </h3>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {investigation.contributorsCount}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Contributors</p>
                  </div>
                  <div className="p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {investigation.notesCount}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Notes</p>
                  </div>
                  <div className="p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {(investigation.helpfulVotes / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Helpful</p>
                  </div>
                </div>

                {/* Action Button */}
                <AnimatedButton variant="primary" size="sm" className="w-full mt-auto">
                  View Investigation
                </AnimatedButton>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
