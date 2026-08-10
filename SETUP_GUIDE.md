# Setup & Installation Guide

## Prerequisites

- **Node.js 16+** - Download from [nodejs.org](https://nodejs.org)
- **npm or yarn** - Comes with Node.js
- **MongoDB** - For backend database
  - Local: Install [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
  - Cloud: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Hardhat** - For smart contract development
- **MetaMask** - Browser extension for Web3 integration

## Project Structure

```
blockchain-password-manager/
├── frontend/              # React application
├── backend/              # Node.js/Express API
├── smart-contracts/      # Solidity contracts
└── README.md
```

## Installation Steps

### 1. Clone the Repository

```bash
cd "o:\Final Year Project"
```

### 2. Install All Dependencies

```bash
npm run install-all
```

This installs dependencies for:
- Root project
- Frontend (React + Vite)
- Backend (Express + MongoDB)

### 3. Configure Environment Variables

#### Frontend (.env.local)
```bash
cd frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:
```
VITE_API_URL=http://localhost:5000
VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
VITE_WEB3_PROVIDER=http://localhost:8545
```

#### Backend (.env)
```bash
cd ../backend
cp .env.example .env
```

Edit `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/password-manager
JWT_SECRET=your-super-secret-jwt-key-change-in-production
WEB3_PROVIDER=http://localhost:8545
CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
NODE_ENV=development
```

### 4. Start MongoDB

**Option 1: Local MongoDB**
```bash
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
- Update MONGODB_URI in `.env` with your Atlas connection string

### 5. Deploy Smart Contracts (Optional)

```bash
cd smart-contracts
npx hardhat compile
npx hardhat deploy --network localhost
```

Update the contract address in `backend/.env` and `frontend/.env.local`

### 6. Start Development Servers

**Run Both (Recommended)**
```bash
npm run dev
```

**Run Separately**

Terminal 1 - Frontend:
```bash
npm run frontend
```

Terminal 2 - Backend:
```bash
npm run backend
```

## Accessing the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## Test Credentials

After creating an account, you can login with:
- Email: your-email@example.com
- Password: your-password

## Features

### 1. Login & Registration
- Create account or login with email/password
- JWT-based authentication
- Secure password hashing with bcryptjs

### 2. Password Dashboard
- View all saved passwords
- Add new passwords
- Delete passwords
- Copy passwords to clipboard
- Toggle password visibility

### 3. Website Tracker
- Track all websites/apps with saved credentials
- Portfolio summary statistics
- Organization by website

### 4. Password Strength Analyzer
- Real-time password strength assessment
- Strength distribution chart
- Individual password analysis with feedback
- Security recommendations

### 5. Blockchain Integration
- Smart contract for password hash storage
- User registration on blockchain
- Immutable password records

## Development

### Frontend Structure
```
frontend/src/
├── components/      # Reusable React components
├── pages/          # Page components
├── App.jsx         # Main App component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

### Backend Structure
```
backend/
├── controllers/    # Business logic
├── models/         # MongoDB schemas
├── routes/         # API endpoints
├── middleware/     # Custom middleware
├── config/         # Configuration
└── server.js       # Express server
```

### Smart Contracts Structure
```
smart-contracts/
├── contracts/      # Solidity contracts
├── scripts/        # Deployment scripts
├── test/          # Contract tests
└── hardhat.config.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)

### Passwords
- `GET /api/passwords` - Get all passwords (requires token)
- `POST /api/passwords` - Create password (requires token)
- `DELETE /api/passwords/:id` - Delete password (requires token)
- `PUT /api/passwords/:id` - Update password (requires token)
- `GET /api/passwords/strength/:id` - Get password strength (requires token)

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  walletAddress: String,
  createdAt: Date,
  lastLogin: Date
}
```

### Password Model
```javascript
{
  userId: ObjectId,
  website: String,
  username: String,
  password: String,
  encryptedPassword: String,
  blockchainHash: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Ethers.js** - Web3 integration

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing

### Blockchain
- **Solidity** - Smart contracts
- **Hardhat** - Development framework
- **OpenZeppelin** - Contract libraries
- **Ethers.js** - Ethereum interaction

## Troubleshooting

### MongoDB Connection Error
```
Solution: Ensure MongoDB is running:
mongod
```

### Port Already in Use
```
Frontend (5173): Change VITE_PORT in vite.config.js
Backend (5000): Change PORT in .env
```

### Dependencies Installation Issues
```
Delete node_modules and package-lock.json:
rm -rf node_modules package-lock.json
npm install
```

### Smart Contract Compilation Error
```
Ensure Solidity version matches:
npm install --save-dev @openzeppelin/hardhat-toolbox
```

## Security Considerations

1. **Change JWT_SECRET** in production
2. **Use environment variables** for sensitive data
3. **Enable HTTPS** in production
4. **Implement rate limiting** for API
5. **Validate all inputs** on backend
6. **Use .env.local** - Never commit .env files
7. **Encrypt passwords** before blockchain storage

## Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Backend (Heroku/Railway)
```bash
git push heroku main
```

### Smart Contracts
```bash
npx hardhat run scripts/deploy.js --network mainnet
```

## Support & Documentation

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express Documentation](https://expressjs.com)
- [Hardhat Documentation](https://hardhat.org)
- [Solidity Documentation](https://docs.soliditylang.org)
- [Ethers.js Documentation](https://docs.ethers.org)

## License

MIT License - See LICENSE file for details

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/feature-name`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to branch (`git push origin feature/feature-name`)
5. Create Pull Request
