# OpenTruth - Complete Project Overview

## Mission

OpenTruth is a decentralized social network that combines the engagement of Twitter with the governance of DAOs, enabling community-driven moderation, reputation-based authority, and transparent decision-making.

## What's Built

### Phase 1: Complete Foundation (✅ Delivered)

#### Authentication System
- **Sign-In with Ethereum (SIWE)** - Secure wallet-based authentication
- **JWT Tokens** - HTTP-only cookie storage for sessions
- **User Profiles** - Store user metadata (username, bio, reputation)

#### Core Social Features
- **Post Creation** - Create posts with IPFS content storage
- **Comments** - Thread discussions on posts
- **Voting System** - Upvote/downvote posts and comments
- **Post Feed** - Chronological or reputation-ranked feed

#### Reputation System
- **Reputation Tokens** - Non-transferable NFTs on Polygon
- **Tier System** - Bronze (100), Silver (500), Gold (2000) reputation thresholds
- **Reputation Tracking** - Award/burn based on community engagement

#### DAO Governance
- **Proposal System** - Create platform governance proposals
- **Voting** - Reputation-weighted voting on proposals
- **Smart Contracts** - On-chain governance logic

#### Community Notes
- **Note Types** - Context, Corrections, Disputes
- **Community Voting** - Helpful/not helpful voting
- **IPFS Storage** - Immutable note content

#### Web3 Integration
- **Polygon Network** - Low-cost transactions
- **Web3.Storage** - Decentralized IPFS pinning
- **Smart Contracts** - ReputationToken, GovernanceDAO, ContentRegistry
- **RainbowKit** - Wallet connection UI

### Technical Stack

#### Frontend
```
Next.js 16
React 19
TypeScript 5.7
Tailwind CSS 4
Wagmi (Web3 hooks)
RainbowKit (Wallet UI)
SWR (Data fetching)
Lucide Icons
Date-fns (Date utilities)
```

#### Backend
```
Next.js API Routes
PostgreSQL
Drizzle ORM
PostgreSQL pg driver
Web3.Storage (IPFS)
```

#### Blockchain
```
Solidity 0.8.19
Polygon Network
Viem (Ethereum client)
OpenZeppelin contracts
```

### Project Structure

```
opentruth/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── nonce/route.ts          # SIWE nonce generation
│   │   │   └── signin/route.ts         # Sign-in endpoint
│   │   ├── posts/route.ts              # Posts CRUD
│   │   ├── comments/route.ts           # Comments API
│   │   ├── votes/route.ts              # Voting API
│   │   ├── community-notes/route.ts    # Community notes API
│   │   └── users/profile/route.ts      # User profile management
│   ├── feed/
│   │   ├── page.tsx                    # Main feed page
│   │   └── layout.tsx                  # Feed layout
│   ├── profile/page.tsx                # User profile page
│   ├── governance/page.tsx             # DAO governance page
│   ├── layout.tsx                      # Root layout
│   ├── page.tsx                        # Landing page
│   └── globals.css                     # Global styles
├── components/
│   ├── feed/
│   │   ├── MainFeed.tsx               # Feed component
│   │   ├── Sidebar.tsx                # Navigation sidebar
│   │   ├── PostComposer.tsx           # Post creation form
│   │   ├── PostCard.tsx               # Post display
│   │   └── Recommendations.tsx        # Trending/Users sidebar
│   ├── ui/
│   │   └── button.tsx                 # Reusable button
│   └── Providers.tsx                  # Web3 providers
├── lib/
│   ├── db/
│   │   ├── schema.ts                  # Database schema (Drizzle)
│   │   └── db.ts                      # Database connection
│   ├── web3/
│   │   ├── config.ts                  # Web3 configuration
│   │   └── ipfs.ts                    # IPFS utilities
│   ├── auth/
│   │   └── siwe.ts                    # SIWE authentication
│   └── utils.ts                       # Utility functions
├── contracts/
│   ├── ReputationToken.sol            # Reputation NFT contract
│   ├── GovernanceDAO.sol              # Governance contract
│   └── ContentRegistry.sol            # Content registry contract
├── public/                            # Static assets
├── SETUP.md                           # Setup instructions
├── DEPLOYMENT.md                      # Deployment guide
├── PROJECT_OVERVIEW.md               # This file
└── package.json                      # Dependencies

```

### Database Schema

```
users
├── id (PK)
├── walletAddress (unique)
├── username (unique)
├── displayName
├── bio
├── avatar (IPFS)
├── coverImage (IPFS)
├── reputationScore
├── tier
├── followerCount
├── followingCount
└── timestamps

posts
├── id (PK)
├── authorId (FK: users)
├── content
├── ipfsHash (unique)
├── contractPostId
├── upvotes
├── downvotes
├── commentCount
├── isFlagged
└── timestamps

comments
├── id (PK)
├── postId (FK: posts)
├── authorId (FK: users)
├── content
├── ipfsHash
├── upvotes
├── downvotes
└── timestamps

communityNotes
├── id (PK)
├── postId (FK: posts)
├── authorId (FK: users)
├── noteType (context/dispute/correction)
├── content
├── ipfsHash
├── contractNoteId
├── helpfulVotes
├── notHelpfulVotes
├── isActive
└── timestamps

proposals
├── id (PK)
├── title
├── description
├── proposerId (FK: users)
├── ipfsHash
├── contractProposalId
├── forVotes
├── againstVotes
├── abstainVotes
├── status (active/passed/failed)
└── timestamps
```

### Smart Contracts

#### ReputationToken.sol
- Non-transferable reputation NFTs
- Tier progression (0-3 levels)
- Award/burn functionality
- Threshold-based tier upgrades

#### GovernanceDAO.sol
- Create proposals with IPFS content
- Reputation-weighted voting
- Pass criteria: FOR votes > AGAINST votes
- 3-day voting window

#### ContentRegistry.sol
- Register posts on-chain
- Track upvotes/downvotes
- Community note registry
- Helpful/not helpful voting

### API Endpoints

```
Authentication
GET  /api/auth/nonce               # Get SIWE nonce
POST /api/auth/signin              # Sign in with SIWE

Posts
GET  /api/posts                    # Get feed posts
POST /api/posts                    # Create post

Comments
GET  /api/comments?postId=1        # Get post comments
POST /api/comments                 # Create comment

Voting
POST /api/votes                    # Vote on post

Community Notes
GET  /api/community-notes?postId=1 # Get post notes
POST /api/community-notes          # Create note

User Profile
GET  /api/users/profile            # Get user profile
PUT  /api/users/profile            # Update profile
```

### Key Features

1. **True Decentralization**
   - Wallet-based authentication (no password)
   - IPFS content storage
   - On-chain governance
   - Smart contract transparency

2. **Reputation-Based Authority**
   - Earn reputation through quality engagement
   - Tier progression with milestones
   - Reputation-weighted voting power
   - Community-driven moderation

3. **Transparent Governance**
   - Public proposal creation
   - Reputation-weighted voting
   - On-chain execution
   - Community oversight

4. **Content Moderation**
   - Community notes with voting
   - Multiple context types (dispute, correction, context)
   - Helpful/not helpful ratings
   - Transparent flagging system

5. **Web3-First Design**
   - Polygon for scalability
   - IPFS for permanence
   - ERC-721 reputation tokens
   - DAO governance

## Getting Started

### Local Development

1. **Clone & Install**
```bash
git clone <repo>
cd opentruth
pnpm install
```

2. **Configure Environment**
```bash
cp .env.example .env.local
# Fill in required variables
```

3. **Database Setup**
```bash
pnpm exec drizzle-kit generate
pnpm exec drizzle-kit migrate
```

4. **Deploy Smart Contracts**
```bash
cd contracts
npx hardhat run scripts/deploy.js --network mumbai
```

5. **Run Dev Server**
```bash
pnpm dev
```

### Testing Flows

1. **Sign In**
   - Connect wallet via MetaMask
   - Sign SIWE message
   - Get JWT token
   - Redirect to feed

2. **Create Post**
   - Type content
   - Upload to IPFS via Web3.Storage
   - Save post metadata to database
   - Register on-chain if available

3. **Vote**
   - Click upvote/downvote
   - Store vote in database
   - Update vote counts
   - Call blockchain if available

4. **Create Proposal**
   - Navigate to Governance
   - Fill proposal form
   - Submit to blockchain
   - Community votes

## Deployment

### Development
- Local testing with Mumbai testnet
- Mock smart contract calls
- Local PostgreSQL

### Production
- Deployed to Vercel
- Polygon mainnet smart contracts
- Production PostgreSQL database
- Web3.Storage for IPFS

See DEPLOYMENT.md for detailed instructions.

## Future Enhancements

### Phase 2: Advanced Features
- [ ] Direct messaging
- [ ] Groups/Communities
- [ ] NFT tokenomics
- [ ] Rewards system
- [ ] Content recommendations
- [ ] Mobile app

### Phase 3: Scaling
- [ ] Layer 2 optimizations
- [ ] Off-chain voting (Snapshot)
- [ ] Sharding/partitioning
- [ ] Multi-chain support

### Phase 4: Enterprise
- [ ] Corporate governance
- [ ] Verified badges
- [ ] Content moderation tools
- [ ] Analytics dashboard
- [ ] API for third parties

## Security

- JWT authentication with HTTP-only cookies
- SIWE signature verification
- Input validation and sanitization
- SQL injection prevention (Drizzle ORM)
- CORS configuration
- Environment variable separation

**Note**: Smart contracts should be audited before mainnet deployment.

## Performance

- Static generation for landing page
- Incremental Static Regeneration for feeds
- SWR for client-side caching
- IPFS content caching
- Database query optimization
- Edge caching with Vercel

## Metrics & Analytics

- User growth tracking
- Engagement metrics (posts, votes, comments)
- Reputation distribution
- Proposal participation rates
- Smart contract gas usage

## Community & Support

- GitHub: Issue tracking and contributions
- Discord: Community discussions
- Twitter: Updates and announcements
- Forum: Long-form discussions

## License

MIT - Open source for community benefit

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request
4. Follow our code of conduct

## Roadmap

**Q1 2024**: MVP launch with core features
**Q2 2024**: Community feedback and iteration
**Q3 2024**: Advanced governance features
**Q4 2024**: Mainnet expansion

## Contact

- Email: team@opentruth.web3
- Twitter: @OpenTruthDAO
- Discord: [Join us](https://discord.gg/opentruth)

---

**OpenTruth**: Building a more transparent, community-driven internet.
