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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Investigations
          </h1>
          <p className="text-muted-foreground">
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
              <GlassCard className="overflow-hidden flex flex-col h-full cursor-pointer hover:bg-white/80">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      investigation.status === 'active'
                        ? 'bg-blue-50 text-blue-700 border border-blue-100'
                        : 'bg-green-50 text-green-700 border border-green-100'
                    }`}
                  >
                    {investigation.status === 'active' ? 'Active' : 'Completed'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {investigation.title}
                </h3>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="p-3 bg-muted/30 rounded-xl border border-border">
                    <p className="text-sm font-semibold text-foreground">
                      {investigation.contributorsCount}
                    </p>
                    <p className="text-xs text-muted-foreground">Contributors</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-xl border border-border">
                    <p className="text-sm font-semibold text-foreground">
                      {investigation.notesCount}
                    </p>
                    <p className="text-xs text-muted-foreground">Notes</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-xl border border-border">
                    <p className="text-sm font-semibold text-foreground">
                      {(investigation.helpfulVotes / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-muted-foreground">Helpful</p>
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
