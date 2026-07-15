import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  varchar,
  decimal,
  uniqueIndex,
  index,
  serial,
} from 'drizzle-orm/pg-core'

// Users table
export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    walletAddress: varchar('wallet_address', { length: 42 }).notNull().unique(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    displayName: varchar('display_name', { length: 255 }),
    bio: text('bio'),
    avatar: text('avatar'), // IPFS hash
    coverImage: text('cover_image'), // IPFS hash
    reputationScore: integer('reputation_score').default(0),
    tier: integer('tier').default(0), // 0-3 tier levels
    followerCount: integer('follower_count').default(0),
    followingCount: integer('following_count').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    walletIdx: uniqueIndex('wallet_idx').on(table.walletAddress),
    usernameIdx: index('username_idx').on(table.username),
  })
)

// Follow relationships
export const follows = pgTable(
  'follows',
  {
    id: serial('id').primaryKey(),
    followerId: integer('follower_id').notNull().references(() => users.id),
    followingId: integer('following_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    idx: index('follows_idx').on(table.followerId, table.followingId),
  })
)

// Posts table
export const posts = pgTable(
  'posts',
  {
    id: serial('id').primaryKey(),
    authorId: integer('author_id').notNull().references(() => users.id),
    content: text('content').notNull(),
    ipfsHash: varchar('ipfs_hash', { length: 255 }).notNull().unique(),
    contractPostId: integer('contract_post_id'), // ID from blockchain
    upvotes: integer('upvotes').default(0),
    downvotes: integer('downvotes').default(0),
    commentCount: integer('comment_count').default(0),
    isFlagged: boolean('is_flagged').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    authorIdx: index('posts_author_idx').on(table.authorId),
    ipfsIdx: uniqueIndex('posts_ipfs_idx').on(table.ipfsHash),
    createdIdx: index('posts_created_idx').on(table.createdAt),
  })
)

// Comments table
export const comments = pgTable(
  'comments',
  {
    id: serial('id').primaryKey(),
    postId: integer('post_id').notNull().references(() => posts.id),
    authorId: integer('author_id').notNull().references(() => users.id),
    content: text('content').notNull(),
    ipfsHash: varchar('ipfs_hash', { length: 255 }).notNull().unique(),
    upvotes: integer('upvotes').default(0),
    downvotes: integer('downvotes').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    postIdx: index('comments_post_idx').on(table.postId),
    authorIdx: index('comments_author_idx').on(table.authorId),
    createdIdx: index('comments_created_idx').on(table.createdAt),
  })
)

// Post votes (upvotes/downvotes)
export const postVotes = pgTable(
  'post_votes',
  {
    id: serial('id').primaryKey(),
    postId: integer('post_id').notNull().references(() => posts.id),
    voterId: integer('voter_id').notNull().references(() => users.id),
    voteType: varchar('vote_type', { length: 10 }).notNull(), // 'upvote' or 'downvote'
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    idx: uniqueIndex('post_votes_idx').on(table.postId, table.voterId),
  })
)

// Comment votes
export const commentVotes = pgTable(
  'comment_votes',
  {
    id: serial('id').primaryKey(),
    commentId: integer('comment_id').notNull().references(() => comments.id),
    voterId: integer('voter_id').notNull().references(() => users.id),
    voteType: varchar('vote_type', { length: 10 }).notNull(), // 'upvote' or 'downvote'
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    idx: uniqueIndex('comment_votes_idx').on(table.commentId, table.voterId),
  })
)

// Community notes
export const communityNotes = pgTable(
  'community_notes',
  {
    id: serial('id').primaryKey(),
    postId: integer('post_id').notNull().references(() => posts.id),
    authorId: integer('author_id').notNull().references(() => users.id),
    noteType: varchar('note_type', { length: 50 }).notNull(), // 'context', 'dispute', 'correction'
    content: text('content').notNull(),
    ipfsHash: varchar('ipfs_hash', { length: 255 }).notNull().unique(),
    contractNoteId: integer('contract_note_id'), // ID from blockchain
    helpfulVotes: integer('helpful_votes').default(0),
    notHelpfulVotes: integer('not_helpful_votes').default(0),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    postIdx: index('notes_post_idx').on(table.postId),
    authorIdx: index('notes_author_idx').on(table.authorId),
    ipfsIdx: uniqueIndex('notes_ipfs_idx').on(table.ipfsHash),
  })
)

// Community note votes
export const communityNoteVotes = pgTable(
  'community_note_votes',
  {
    id: serial('id').primaryKey(),
    noteId: integer('note_id').notNull().references(() => communityNotes.id),
    voterId: integer('voter_id').notNull().references(() => users.id),
    voteType: varchar('vote_type', { length: 10 }).notNull(), // 'helpful' or 'not_helpful'
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    idx: uniqueIndex('note_votes_idx').on(table.noteId, table.voterId),
  })
)

// Governance proposals
export const proposals = pgTable(
  'proposals',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    proposerId: integer('proposer_id').notNull().references(() => users.id),
    ipfsHash: varchar('ipfs_hash', { length: 255 }).notNull(),
    contractProposalId: integer('contract_proposal_id'), // ID from blockchain
    forVotes: integer('for_votes').default(0),
    againstVotes: integer('against_votes').default(0),
    abstainVotes: integer('abstain_votes').default(0),
    status: varchar('status', { length: 50 }).notNull().default('active'), // active, passed, failed, executed
    createdAt: timestamp('created_at').defaultNow(),
    deadline: timestamp('deadline').notNull(),
    executedAt: timestamp('executed_at'),
  },
  (table) => ({
    proposerIdx: index('proposals_proposer_idx').on(table.proposerId),
    statusIdx: index('proposals_status_idx').on(table.status),
    deadlineIdx: index('proposals_deadline_idx').on(table.deadline),
  })
)

// Proposal votes
export const proposalVotes = pgTable(
  'proposal_votes',
  {
    id: serial('id').primaryKey(),
    proposalId: integer('proposal_id').notNull().references(() => proposals.id),
    voterId: integer('voter_id').notNull().references(() => users.id),
    voteType: varchar('vote_type', { length: 10 }).notNull(), // 'for', 'against', 'abstain'
    votingPower: integer('voting_power').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    idx: uniqueIndex('proposal_votes_idx').on(table.proposalId, table.voterId),
  })
)

// Activity/notifications log
export const activities = pgTable(
  'activities',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    type: varchar('type', { length: 50 }).notNull(), // 'comment', 'upvote', 'follow', 'reply', etc.
    actorId: integer('actor_id').notNull().references(() => users.id),
    targetType: varchar('target_type', { length: 50 }).notNull(), // 'post', 'comment', 'profile'
    targetId: integer('target_id'),
    isRead: boolean('is_read').default(false),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    userIdx: index('activities_user_idx').on(table.userId),
    createdIdx: index('activities_created_idx').on(table.createdAt),
  })
)
