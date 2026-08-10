# Deployment & Integration Guide

## 📋 Pre-Deployment Checklist

### Security
- [ ] Change JWT_SECRET in production
- [ ] Update MONGODB_URI for production database
- [ ] Enable HTTPS on all endpoints
- [ ] Configure environment variables properly
- [ ] Update CORS origins for production domain
- [ ] Enable rate limiting
- [ ] Set secure cookie flags
- [ ] Implement API key authentication if needed

### Frontend
- [ ] Update API endpoint to production backend
- [ ] Update contract address for mainnet
- [ ] Configure proper error handling
- [ ] Test all user workflows
- [ ] Optimize bundle size
- [ ] Test responsive design
- [ ] Clear console logs (remove debugging)
- [ ] Test across browsers

### Backend
- [ ] Verify all environment variables
- [ ] Test database connection
- [ ] Enable logging (structured logs)
- [ ] Set up monitoring/alerts
- [ ] Configure backups
- [ ] Test rate limiting
- [ ] Verify CORS configuration
- [ ] Run security audit

### Smart Contracts
- [ ] Audit contract code
- [ ] Test on testnet first
- [ ] Verify contract address
- [ ] Set up event monitoring
- [ ] Document contract ABI
- [ ] Create upgrade mechanism
- [ ] Test gas optimization

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
```bash
cd frontend
npm run build
```

This creates an optimized production build in `dist/` folder.

### Step 2: Set Up Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Install Vercel CLI: `npm install -g vercel`

### Step 3: Deploy
```bash
cd frontend
vercel
```

### Step 4: Configure Environment Variables
In Vercel Dashboard:
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add:
   - `VITE_API_URL`: Production API URL
   - `VITE_CONTRACT_ADDRESS`: Mainnet contract address
   - `VITE_WEB3_PROVIDER`: Mainnet RPC endpoint

### Step 5: Set Custom Domain
1. Go to Vercel project settings
2. Add custom domain
3. Update DNS records

---

## 🚀 Backend Deployment (Railway)

### Step 1: Prepare Backend
```bash
cd backend
npm install
# Verify everything runs locally
npm start
```

### Step 2: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project

### Step 3: Connect to Git
1. Select your GitHub repository
2. Authorize Railway
3. Select backend folder

### Step 4: Set Environment Variables
In Railway Dashboard:
1. Go to Variables
2. Add all from `.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/password-manager
JWT_SECRET=your-production-secret-key
WEB3_PROVIDER=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
CONTRACT_ADDRESS=0x...
NODE_ENV=production
```

### Step 5: Deploy
Railway auto-deploys on git push:
```bash
git push origin main
```

### Step 6: Get Backend URL
Railway generates a public URL automatically. Update frontend's `VITE_API_URL`.

---

## 📊 Database Setup (MongoDB Atlas)

### Step 1: Create Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up free account
3. Create organization

### Step 2: Create Cluster
1. Click "Create Deployment"
2. Choose free tier (M0)
3. Select region closest to users
4. Create cluster (5-10 minutes)

### Step 3: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Set username: `passwordmanager`
4. Set strong password (50+ characters)
5. Grant read/write permissions

### Step 4: Add IP Whitelist
1. Go to "Network Access"
2. Click "Add IP Address"
3. Add your server IP (Railway shows it)
4. Or add 0.0.0.0/0 for development only

### Step 5: Get Connection String
1. Click "Connect" on cluster
2. Select "Connect your application"
3. Copy connection string
4. Replace username and password
5. Use in `MONGODB_URI`

Example:
```
mongodb+srv://passwordmanager:password@cluster.mongodb.net/password-manager?retryWrites=true&w=majority
```

---

## ⛓️ Smart Contract Deployment

### Step 1: Compile Contract
```bash
cd smart-contracts
npx hardhat compile
```

### Step 2: Configure Network (Testnet First)
Update `hardhat.config.js`:
```javascript
networks: {
  sepolia: {
    url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
    accounts: [process.env.PRIVATE_KEY]
  },
  ethereum: {
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    accounts: [process.env.PRIVATE_KEY]
  }
}
```

### Step 3: Set Environment Variables
```
INFURA_KEY=your-infura-project-id
PRIVATE_KEY=your-wallet-private-key
```

### Step 4: Deploy to Testnet
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Save the contract address!

### Step 5: Verify Contract on Etherscan
```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

### Step 6: Deploy to Mainnet
Once tested on testnet:
```bash
npx hardhat run scripts/deploy.js --network ethereum
```

### Step 7: Update Configuration
Update in backend `.env` and frontend `.env.local`:
```
CONTRACT_ADDRESS=0x...
```

---

## 🔒 SSL Certificate Setup

### For Backend (Railway)
Railway provides automatic HTTPS. No additional setup needed.

### For Custom Domain
1. Use Let's Encrypt (free)
2. Configure auto-renewal
3. Add to Nginx/Apache config

---

## 📈 Monitoring & Logging

### Frontend Monitoring
```javascript
// Add to React
window.addEventListener('error', (event) => {
  console.error('Frontend Error:', event);
  // Send to monitoring service
  sendToMonitoring({
    error: event.error,
    timestamp: new Date(),
    page: window.location.href
  });
});
```

### Backend Logging
```javascript
// Add to Express
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
  ]
});

app.use((req, res, next) => {
  logger.info({
    method: req.method,
    path: req.path,
    timestamp: new Date()
  });
  next();
});
```

### Smart Contract Monitoring
Monitor events on blockchain explorer:
- Etherscan (Ethereum)
- PolygonScan (Polygon)
- BlockScout (various networks)

---

## 🧪 Testing Before Production

### Frontend Testing
```bash
cd frontend
npm run build
npm run preview  # Test production build locally
```

### Backend Testing
```bash
cd backend
NODE_ENV=production npm start
# Test all endpoints with Postman
```

### End-to-End Testing
1. Create test account
2. Add passwords
3. Check strength analysis
4. Delete passwords
5. Verify blockchain records

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm run install-all
      
      - name: Build frontend
        run: npm run build --prefix frontend
      
      - name: Run tests
        run: npm test --prefix backend
      
      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Railway
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 📊 Performance Optimization

### Frontend
```javascript
// Code splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const PasswordStrength = React.lazy(() => import('./components/PasswordStrength'));

// Use Suspense
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

### Backend
```javascript
// Caching with Redis
const redis = require('redis');
const client = redis.createClient();

app.get('/api/passwords', (req, res) => {
  const cacheKey = `passwords:${req.userId}`;
  
  client.get(cacheKey, (err, data) => {
    if (data) {
      return res.json(JSON.parse(data));
    }
    
    // Fetch from DB and cache
    Password.find({ userId: req.userId }, (err, passwords) => {
      client.setex(cacheKey, 3600, JSON.stringify(passwords));
      res.json(passwords);
    });
  });
});
```

---

## 🚨 Rollback Plan

### If Frontend Deployment Fails
1. Go to Vercel dashboard
2. Click "Deployments"
3. Select previous working deployment
4. Click "Promote to Production"

### If Backend Deployment Fails
1. Go to Railway dashboard
2. Revert to previous version
3. Or redeploy from git:
```bash
git revert HEAD
git push
```

### If Database is Corrupted
1. MongoDB Atlas auto-backups daily
2. Go to "Snapshots" in Atlas
3. Restore from previous backup
4. Update application to use restored database

---

## 📧 Alert Setup

### For Backend Errors
Set up email alerts in Railway:
1. Go to project settings
2. Enable Slack/email notifications
3. Set alert thresholds

### For Database Issues
In MongoDB Atlas:
1. Go to Alerts
2. Set up email notifications
3. Alert on: high connections, errors, disk usage

### For Smart Contract Events
Use services like:
- Alchemy Webhook
- Tenderly Monitoring
- The Graph

---

## 🔐 Security in Production

### API Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### CORS Configuration
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Helmet Security Headers
```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Hardhat Docs**: https://hardhat.org/docs
- **Express.js Docs**: https://expressjs.com
- **React Docs**: https://react.dev

---

## 🎯 Post-Deployment

1. ✅ Test all features in production
2. ✅ Monitor error logs
3. ✅ Check performance metrics
4. ✅ Verify blockchain integration
5. ✅ Monitor database usage
6. ✅ Set up backups
7. ✅ Enable security headers
8. ✅ Plan maintenance windows
9. ✅ Document runbook
10. ✅ Brief team on deployment

---

**Deployment complete! Your blockchain password manager is live! 🚀**
