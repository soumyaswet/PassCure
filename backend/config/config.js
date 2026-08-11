require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/password-manager',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  web3Provider: process.env.WEB3_PROVIDER || 'http://localhost:8545',
  contractAddress: process.env.CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  nodeEnv: process.env.NODE_ENV || 'development',
};
