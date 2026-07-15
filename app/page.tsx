'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Background3D } from '@/components/3d/Background3D'
import { GlassCard } from '@/components/ui/GlassCard'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { StatCard } from '@/components/ui/StatCard'
import { fadeInUp, containerVariants, itemVariants } from '@/lib/design-system'
import { Shield, Star, Vote, FileText, Link2, Zap } from 'lucide-react'

export default function HomePage() {
  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected && address) {
      redirect('/feed')
    }
  }, [isConnected, address])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* 3D Background */}
      <Background3D />

      {/* Navigation */}
      <motion.nav
        className="relative z-40 glass border-b border-white/20 backdrop-blur-xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
              <span className="text-white font-bold text-lg">◎</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              OpenTruth
            </h1>
          </motion.div>
          <div className="flex gap-8">
            <Link
              href="#features"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="#stats"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4">
              The Truth Network
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Decentralized governance meets community-driven social media. Share, discover, and shape the conversation with Web3 power.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center gap-4">
            <ConnectButton />
          </motion.div>

          {/* Key Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
            <StatCard
              label="Network"
              value="100%"
              change="Decentralized"
              trend="up"
              icon={<Shield className="w-5 h-5" />}
            />
            <StatCard
              label="Reputation"
              value="Web3"
              change="On-chain Tokens"
              trend="up"
              icon={<Star className="w-5 h-5" />}
            />
            <StatCard
              label="Governance"
              value="∞"
              change="Community Votes"
              trend="up"
              icon={<Vote className="w-5 h-5" />}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h3 className="text-5xl font-bold text-slate-900 dark:text-white">
              Powerful Features
            </h3>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Everything you need for a truly decentralized experience
            </p>
          </div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <GlassCard className="h-full">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Wallet Auth</h4>
                  <p className="text-slate-600 dark:text-slate-300 flex-1">
                    Sign in securely with Ethereum. No passwords, no risk of breaches.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard className="h-full">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Reputation</h4>
                  <p className="text-slate-600 dark:text-slate-300 flex-1">
                    Earn reputation through quality content and community participation.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard className="h-full">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
                    <Vote className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">DAO Voting</h4>
                  <p className="text-slate-600 dark:text-slate-300 flex-1">
                    Shape the platform with reputation-weighted governance votes.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard className="h-full">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-pink-500/30">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Community Notes</h4>
                  <p className="text-slate-600 dark:text-slate-300 flex-1">
                    Add context and corrections with community-voted notes on posts.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard className="h-full">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30">
                    <Link2 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">IPFS Storage</h4>
                  <p className="text-slate-600 dark:text-slate-300 flex-1">
                    All content immutably stored on IPFS through Web3.Storage.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard className="h-full">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Polygon Powered</h4>
                  <p className="text-slate-600 dark:text-slate-300 flex-1">
                    Fast, secure, low-cost blockchain with Polygon&apos;s infrastructure.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-2 border-blue-400/30 rounded-3xl p-12 text-center backdrop-blur-xl"
        >
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Join OpenTruth
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Connect your wallet to start sharing, voting, and building the future of decentralized social media.
          </p>
          <ConnectButton />
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className="relative z-10 border-t border-slate-200 dark:border-slate-700 glass mt-20 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-slate-600 dark:text-slate-400">
          <p className="font-medium">&copy; 2026 OpenTruth. A decentralized social network powered by Web3.</p>
        </div>
      </motion.footer>
    </main>
  )
}
