import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Feed - OpenTruth',
  description: 'Your decentralized social feed',
}

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {children}
    </div>
  )
}
