# Blockchain-Based Smart Password Manager

A full-stack password management application secured by blockchain technology and smart contracts. Features a modern, minimalist UI for storing, managing, and analyzing password strength.

## Features

- **Secure Authentication**: Login page with blockchain-backed verification
- **Password Dashboard**: View and manage all saved passwords
- **Website Tracker**: Track all websites/apps with saved credentials
- **Password Strength Analyzer**: Comprehensive password strength assessment
- **Blockchain Security**: Smart contract-based password storage
- **Minimalist Design**: Clean, aesthetic UI with minimal color palette

## Project Structure

```
blockchain-password-manager/
├── frontend/              # React + Tailwind CSS UI
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Utility functions
│   │   └── App.jsx
│   └── package.json
├── backend/              # Node.js + Express API
│   ├── routes/          # API routes
│   ├── controllers/      # Business logic
│   ├── middleware/       # Custom middleware
│   ├── config/          # Configuration files
│   └── server.js
├── smart-contracts/      # Solidity smart contracts
│   ├── contracts/       # Smart contract files
│   └── hardhat.config.js
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn
- MetaMask browser extension
- Hardhat (for smart contracts)

### Installation

1. Clone the repository
```bash
cd "o:\Final Year Project"
```

2. Install dependencies for all packages
```bash
npm run install-all
```

### Development

Run both frontend and backend simultaneously:
```bash
npm run dev
```

Or run them separately:
```bash
npm run frontend
npm run backend
```

## Frontend Setup

The frontend is built with React and styled with Tailwind CSS.

```bash
cd frontend
npm install
npm run dev
```

The app will run on `http://localhost:5173`

## Backend Setup

The backend is a Node.js/Express server providing API endpoints.

```bash
cd backend
npm install
npm run dev
```

The server runs on `http://localhost:5000`

## Smart Contracts

Deploy smart contracts using Hardhat:

```bash
cd smart-contracts
npm install
npx hardhat compile
npx hardhat deploy
```

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/passwords` - Fetch all saved passwords
- `POST /api/passwords` - Save new password
- `DELETE /api/passwords/:id` - Delete password
- `GET /api/websites` - Fetch all tracked websites
- `GET /api/strength/:id` - Get password strength analysis

## Technology Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB
- **Blockchain**: Solidity, Hardhat, Ethers.js
- **Authentication**: JWT, Web3.js

## Security Features

- Passwords encrypted before blockchain storage
- JWT authentication for API endpoints
- Web3 wallet integration for user verification
- Smart contracts audit-ready

## License

MIT

## Support

For issues and questions, please open a GitHub issue.
