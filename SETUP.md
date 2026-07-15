# OpenTruth - Decentralized Social Network

A Web3 social platform with decentralized governance, reputation tokens, and community-driven moderation built on Polygon.

## Features

- **SIWE Authentication**: Sign in with Ethereum wallet - no passwords or centralized authentication
- **Reputation System**: Earn reputation through quality posts, governance participation, and community moderation
- **DAO Governance**: Vote on proposals using your reputation score as voting power
- **Community Notes**: Add context, corrections, and disputes to posts through community voting
- **IPFS Storage**: All content stored on IPFS for true decentralization
- **Polygon Blockchain**: Fast, secure, and low-cost transactions

## Architecture

### Frontend
- **Next.js 16** - React framework with Server Components
- **Tailwind CSS** - Utility-first CSS framework
- **Wagmi** - React hooks for Ethereum
- **Rainbow Kit** - Wallet connection UI
- **SWR** - Data fetching and caching

### Backend
- **PostgreSQL** - Primary database
- **Drizzle ORM** - Type-safe SQL ORM
- **Web3.Storage** - IPFS pinning service
- **Next.js API Routes** - Serverless functions

### Blockchain
- **Polygon Network** - Smart contract deployment
- **Solidity** - Smart contracts for reputation, governance, and content registry
- **Viem** - Ethereum client

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Ethereum wallet (MetaMask, etc.)

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_WEB3_STORAGE_TOKEN` - Get from https://web3.storage
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Get from https://cloud.walletconnect.com
- `JWT_SECRET` - Generate a random secret: `openssl rand -base64 32`

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Database Setup

Create the database and run migrations:

```bash
# Generate migration files (after schema changes)
pnpm exec drizzle-kit generate

# Run migrations
pnpm exec drizzle-kit migrate
```

### 5. Smart Contracts Deployment

Deploy smart contracts to Polygon:

```bash
# Using Hardhat or Foundry
cd contracts
# Follow contract deployment instructions
```

After deployment, update the contract addresses in `.env.local`

### 6. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/
│   ├── api/              # API routes
│   ├── feed/             # Social feed pages
│   ├── profile/          # User profile page
│   ├── governance/       # DAO governance pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/
│   ├── feed/             # Feed components
│   ├── ui/               # UI components
│   └── Providers.tsx     # Web3 providers
├── lib/
│   ├── db/               # Database
│   ├── web3/             # Web3 utilities
│   └── auth/             # Authentication
├── contracts/            # Solidity smart contracts
└── public/               # Static assets
```

## API Endpoints

### Authentication
- `GET /api/auth/nonce` - Get nonce for SIWE
- `POST /api/auth/signin` - Sign in with SIWE message

### Posts
- `GET /api/posts` - Get posts feed
- `POST /api/posts` - Create a new post

### Voting
- `POST /api/votes` - Vote on a post

### Community Notes
- `GET /api/community-notes?postId=1` - Get notes for a post
- `POST /api/community-notes` - Create a community note

## Smart Contracts

### ReputationToken.sol
- Non-transferable NFTs representing user credibility
- Tier system based on reputation score
- Awards and burns for governance participation

### GovernanceDAO.sol
- Create and vote on proposals
- Reputation-weighted voting
- Proposal execution

### ContentRegistry.sol
- Register posts on-chain with IPFS hashes
- Track upvotes/downvotes
- Community notes registry

## Development Workflow

### Add New Features

1. Create database schema in `lib/db/schema.ts`
2. Run migrations: `pnpm exec drizzle-kit generate && drizzle-kit migrate`
3. Create API routes in `app/api/`
4. Build UI components in `components/`
5. Connect frontend to API

### Deployment

Deploy to Vercel:

```bash
git push origin main
```

Vercel will automatically:
1. Install dependencies
2. Build the Next.js app
3. Deploy to CDN
4. Set up serverless functions

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## Security Considerations

- JWT tokens are HTTP-only cookies
- SIWE prevents signature reuse
- Row-level security in database (to be implemented)
- All user inputs are validated and sanitized
- Smart contracts should be audited before mainnet deployment

## Performance Optimization

- Static generation for landing page
- Incremental static regeneration for feeds
- Image optimization with Next.js Image
- Code splitting and lazy loading
- IPFS content caching

## Troubleshooting

### WalletConnect Error
- Get a project ID from https://cloud.walletconnect.com
- Add to `.env.local` as `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

### IPFS Upload Fails
- Get Web3.Storage token from https://web3.storage
- Add to `.env.local` as `NEXT_PUBLIC_WEB3_STORAGE_TOKEN`
- Check internet connection

## License

MIT

## Support

For issues and questions:
- GitHub Issues: [create an issue](https://github.com/opentruth/opentruth/issues)
- Discord: [Join our community](https://discord.gg/opentruth)
- Email: support@opentruth.web3
