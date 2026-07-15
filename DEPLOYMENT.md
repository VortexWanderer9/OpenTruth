# OpenTruth Deployment Guide

Complete guide for deploying OpenTruth to production on Vercel and Polygon mainnet.

## Pre-Deployment Checklist

- [ ] All environment variables configured in `.env.local`
- [ ] Smart contracts deployed to Polygon and addresses updated
- [ ] Web3.Storage token obtained
- [ ] WalletConnect project ID obtained
- [ ] PostgreSQL database created and migrations run
- [ ] JWT secret generated
- [ ] All API endpoints tested locally

## Step 1: Smart Contract Deployment

### 1.1 Compile Contracts

```bash
cd contracts
npx hardhat compile
```

### 1.2 Deploy to Polygon Testnet (Mumbai)

```bash
npx hardhat run scripts/deploy.js --network mumbai
```

### 1.3 Deploy to Polygon Mainnet

```bash
npx hardhat run scripts/deploy.js --network polygon
```

Save the contract addresses and update `.env.local`

## Step 2: Database Setup

### 2.1 Create PostgreSQL Database

```bash
createdb opentruth_prod
```

### 2.2 Run Migrations

```bash
pnpm exec drizzle-kit migrate -- --env="DATABASE_URL"
```

## Step 3: Vercel Deployment

### 3.1 Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Connect your GitHub repository
4. Select OpenTruth repository

### 3.2 Configure Environment Variables

In Vercel project settings, add all environment variables:

```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=...
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...
NEXT_PUBLIC_REPUTATION_TOKEN=0x...
NEXT_PUBLIC_GOVERNANCE_DAO=0x...
NEXT_PUBLIC_CONTENT_REGISTRY=0x...
NEXT_PUBLIC_POLYGON_RPC=https://polygon-rpc.com
JWT_SECRET=...
NODE_ENV=production
```

### 3.3 Deploy

```bash
git push origin main
```

Vercel will automatically build and deploy.

## Step 4: Post-Deployment Verification

### 4.1 Test Landing Page

Visit: `https://your-domain.vercel.app`

### 4.2 Test Wallet Connection

1. Click "Connect Wallet"
2. Sign transaction in MetaMask
3. Verify redirect to /feed

### 4.3 Test Post Creation

1. Navigate to feed
2. Create a test post
3. Verify post appears with IPFS hash

### 4.4 Test Voting

1. Upvote a test post
2. Verify vote count increases
3. Check database for vote record

## Step 5: Monitor & Maintain

### 5.1 Enable Analytics

In Vercel project settings, enable:
- Web Analytics
- Real User Monitoring
- Performance Monitoring

### 5.2 Set Up Alerts

Configure notifications for:
- Build failures
- Performance degradation
- Error rates

### 5.3 Database Maintenance

Regular tasks:
```bash
# Backup
pg_dump opentruth_prod > backup.sql

# Vacuum and analyze
VACUUM ANALYZE;

# Check indexes
SELECT * FROM pg_stat_user_indexes;
```

## Step 6: Smart Contract Verification

Verify contracts on PolygonScan:

1. Go to [PolygonScan](https://polygonscan.com/)
2. Paste contract address
3. Click "Contract" → "Verify and Publish"
4. Upload source code

## Scaling Considerations

### Database Optimization

- Add indexes for frequently queried columns
- Use read replicas for analytics
- Implement caching layer (Redis/Upstash)

### API Optimization

- Enable HTTP compression
- Implement rate limiting
- Use edge caching

### Smart Contract Optimization

- Optimize gas usage
- Consider contract upgrades
- Plan for Layer 2 scaling

## Security Hardening

### Backend

- Enable CORS restrictions
- Implement rate limiting
- Add request validation
- Use HTTPS everywhere

### Frontend

- Enable CSP headers
- Implement wallet address verification
- Add input sanitization

### Smart Contracts

- Get professional audit before mainnet
- Use OpenZeppelin libraries
- Implement pausable mechanisms

## Troubleshooting

### Build Fails

```
Error: ENOENT: no such file or directory
```

Solution: Ensure all environment variables are set in Vercel

### Database Connection Fails

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

Solution: Verify DATABASE_URL and network access

### Smart Contract Deployment Fails

```
Error: insufficient funds for gas
```

Solution: Add MATIC to deployment wallet

### Wallet Connection Fails

```
Error: Project ID not found
```

Solution: Get WalletConnect project ID and add to env vars

## Performance Optimization

### Next.js

```javascript
// Enable React Compiler
reactCompiler: true,

// Image optimization
images: {
  domains: ['w3s.link'],
}
```

### Database

```sql
-- Add indexes
CREATE INDEX idx_posts_author_created ON posts(author_id, created_at DESC);
CREATE INDEX idx_comments_post_created ON comments(post_id, created_at DESC);
```

## Disaster Recovery

### Database Backup

```bash
# Automated daily backups
0 2 * * * pg_dump opentruth_prod > /backups/$(date +%Y%m%d).sql
```

### Contract Recovery

- Implement UUPS proxy pattern
- Store upgrade contracts
- Test recovery procedures

## Monitoring & Logging

### Application Logs

```bash
# View Vercel logs
vercel logs <project-name>
```

### Smart Contract Events

Monitor events emitted by contracts:
- ReputationAwarded
- ProposalCreated
- PostCreated

### Error Tracking

Use Sentry for error tracking:

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});
```

## Updating & Maintenance

### Regular Updates

- Update dependencies: `pnpm update`
- Update smart contracts with UUPS proxy
- Monitor security advisories

### Version Management

```bash
# Tag releases
git tag v1.0.0
git push origin v1.0.0

# Generate changelog
git log v0.1.0..v1.0.0 --oneline > CHANGELOG.md
```

## Cost Optimization

### Infrastructure

- Use Vercel Hobby plan for MVP
- Consider serverless database for lower usage
- Use IPFS pinning service instead of self-hosted

### Blockchain

- Use Polygon for lower gas fees
- Batch transactions when possible
- Cache contract data in database

## Next Steps

1. Monitor user feedback and analytics
2. Implement additional features based on usage
3. Scale infrastructure as needed
4. Plan for mainnet deployment
5. Build community and governance processes
