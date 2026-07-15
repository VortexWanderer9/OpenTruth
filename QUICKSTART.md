# OpenTruth - Quick Start Guide

Get up and running with OpenTruth in 5 minutes.

## Prerequisites

- Node.js 18+
- pnpm
- MetaMask or compatible Ethereum wallet
- PostgreSQL

## 1. Clone and Install

```bash
git clone <repository>
cd opentruth
pnpm install
```

## 2. Set Environment Variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
DATABASE_URL=postgresql://localhost:5432/opentruth
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your_token_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
JWT_SECRET=$(openssl rand -base64 32)
NEXT_PUBLIC_POLYGON_RPC=https://polygon-rpc.com
```

Get these values:
- **Web3.Storage**: https://web3.storage (free)
- **WalletConnect**: https://cloud.walletconnect.com (free)

## 3. Setup Database

```bash
# Create database
createdb opentruth

# Run migrations
pnpm exec drizzle-kit migrate
```

## 4. Start Dev Server

```bash
pnpm dev
```

Visit: `http://localhost:3000`

## 5. Connect Your Wallet

1. Click "Connect Wallet" on homepage
2. Select MetaMask (or your wallet)
3. Approve connection and SIWE signature
4. You're in!

## What You Can Do

### Create Posts
- Write your thoughts
- Content stored on IPFS
- Auto-posted to feed

### Vote on Posts
- Upvote quality content
- Downvote inappropriate content
- Vote counts tracked

### View Governance
- See active proposals
- Vote with your reputation
- Participate in platform decisions

### Edit Profile
- Add display name and bio
- Upload avatar (IPFS)
- View reputation score

## Smart Contracts (Optional)

### Deploy to Mumbai Testnet

```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai
```

Update `.env.local` with contract addresses:
```
NEXT_PUBLIC_REPUTATION_TOKEN=0x...
NEXT_PUBLIC_GOVERNANCE_DAO=0x...
NEXT_PUBLIC_CONTENT_REGISTRY=0x...
```

## Debugging

### Wallet Connection Issues
- Clear browser cache
- Try incognito mode
- Check WalletConnect project ID

### Database Issues
```bash
# Check connection
psql postgresql://localhost:5432/opentruth

# Reset database
pnpm exec drizzle-kit drop
pnpm exec drizzle-kit migrate
```

### IPFS Upload Fails
- Verify Web3.Storage token
- Check internet connection
- Try different IPFS gateway

## Next Steps

1. Read [SETUP.md](./SETUP.md) for detailed setup
2. Check [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) for architecture
3. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production

## Files to Edit

- **Frontend**: `components/` and `app/`
- **Backend API**: `app/api/`
- **Database**: `lib/db/schema.ts`
- **Web3**: `lib/web3/`
- **Styles**: `app/globals.css` and Tailwind classes

## Useful Commands

```bash
# Format code
pnpm exec prettier --write .

# Lint code
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start

# Database schema
pnpm exec drizzle-kit studio

# Generate migrations
pnpm exec drizzle-kit generate
```

## Common Issues

### Port 3000 Already in Use
```bash
npx kill-port 3000
pnpm dev
```

### Module Not Found
```bash
rm -rf node_modules .next
pnpm install
pnpm dev
```

### Database Migration Failed
```bash
pnpm exec drizzle-kit drop
pnpm exec drizzle-kit migrate
```

## Tips

- Use MetaMask's test networks (Mumbai) for development
- Check browser console for errors
- Look at Vercel logs for production issues
- Use PostHog for analytics
- Enable source maps for debugging

## Support

- GitHub Issues: Report bugs
- Discord: Ask questions
- Twitter: Follow updates
- Email: Contact team

---

Happy building! 🚀
