# Blockchain Password Manager - Quick Start Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Install All Dependencies
```bash
cd "o:\Final Year Project"
npm run install-all
```

### Step 2: Set Up Environment Variables

**Frontend** - Create `frontend/.env.local`:
```
VITE_API_URL=http://localhost:5000
VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
VITE_WEB3_PROVIDER=http://localhost:8545
```

**Backend** - Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/password-manager
JWT_SECRET=your-super-secret-jwt-key-change-in-production
WEB3_PROVIDER=http://localhost:8545
CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
NODE_ENV=development
```

### Step 3: Start MongoDB
```bash
mongod
```

### Step 4: Run Development Servers
```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📋 Features

### ✅ Login & Registration
- Email/password authentication
- User account creation
- Secure password hashing

### 🔐 Password Manager Dashboard
- **All Passwords Tab**: View, add, copy, and delete passwords
- **Websites & Apps Tab**: Track all websites with saved credentials
- **Password Strength Tab**: Analyze password security with detailed feedback

### 💪 Password Strength Analyzer
- Real-time strength calculation
- Letter case variation analysis
- Number and special character detection
- Length assessment
- Actionable security recommendations

### ⛓️ Blockchain Integration
- Smart contract for password hash verification
- User registration on blockchain
- Immutable password records

## 🎨 Design Features

### Minimalist Aesthetic
- Clean, light color palette
- Blue (#3B82F6) as primary accent
- Gray scale for secondary elements
- Smooth transitions and hover effects

### Responsive Layout
- Mobile-friendly design
- Adaptive grid layouts
- Touch-friendly buttons and inputs

### User Experience
- Real-time password visibility toggle
- One-click password copying
- Intuitive navigation tabs
- Clear security status indicators

## 📁 Project Structure

```
blockchain-password-manager/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.jsx        # Top navigation bar
│   │   │   ├── PasswordList.jsx      # Password management
│   │   │   ├── WebsiteTracker.jsx    # Website tracking
│   │   │   └── PasswordStrength.jsx  # Strength analysis
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx         # Login
│   │   │   ├── RegisterPage.jsx      # Registration
│   │   │   └── Dashboard.jsx         # Main dashboard
│   │   ├── App.jsx
│   │   └── index.css
│   └── index.html
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── passwordController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Password.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── passwordRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── server.js
└── smart-contracts/
    ├── contracts/
    │   └── PasswordManager.sol
    └── scripts/
        └── deploy.js
```

## 🔑 Key Technologies

- **React 18** - Modern UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Express** - Backend framework
- **MongoDB** - NoSQL database
- **Solidity** - Smart contracts
- **Ethers.js** - Blockchain interaction

## 🛡️ Security Features

✓ JWT authentication  
✓ Password hashing with bcryptjs  
✓ Secure API endpoints  
✓ CORS enabled  
✓ Helmet.js for headers  
✓ Environment variable protection  
✓ Blockchain immutability  

## 📖 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get profile (auth required) |
| GET | `/api/passwords` | Get all passwords (auth required) |
| POST | `/api/passwords` | Create password (auth required) |
| DELETE | `/api/passwords/:id` | Delete password (auth required) |
| PUT | `/api/passwords/:id` | Update password (auth required) |

## 🧪 Testing

### Test Account
Create a new account with any email/password combination.

### Test Features
1. Add multiple passwords for different websites
2. Check password strength analysis
3. View website tracker statistics
4. Toggle password visibility
5. Copy passwords to clipboard

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

## 🎯 Next Steps

1. **Customize Colors**: Edit `frontend/tailwind.config.js`
2. **Add More Features**: Extend components and backend routes
3. **Deploy**: Push to production servers
4. **Integrate MetaMask**: Enable full Web3 wallet functionality
5. **Database Migration**: Move to cloud MongoDB

## ❓ Common Issues

**MongoDB won't connect?**
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in `.env`

**Frontend can't reach backend?**
- Verify backend is running on port 5000
- Check VITE_API_URL in `.env.local`

**Port already in use?**
- Find process: `netstat -ano | findstr :5000` (Windows)
- Kill process or change ports

## 📞 Support

For issues or questions:
1. Check SETUP_GUIDE.md for detailed instructions
2. Review README.md for full documentation
3. Check console logs for error messages

## 📜 License

MIT License - Free to use and modify

---

**Happy coding! 🚀**
