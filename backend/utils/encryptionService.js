const crypto = require('crypto');

// Simple encryption utility (for demonstration)
// In production, use proper encryption libraries like NaCl or libsodium

class EncryptionService {
  constructor(secretKey = process.env.ENCRYPTION_KEY || 'default-secret-key-change-in-production') {
    this.secretKey = secretKey;
  }

  /**
   * Encrypt password
   * @param {string} password - Password to encrypt
   * @returns {Object} - Encrypted password and IV
   */
  encrypt(password) {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        crypto.scryptSync(this.secretKey, 'salt', 32),
        iv
      );

      let encrypted = cipher.update(password, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      return {
        encryptedPassword: encrypted,
        iv: iv.toString('hex'),
      };
    } catch (err) {
      throw new Error('Encryption failed');
    }
  }

  /**
   * Decrypt password
   * @param {string} encrypted - Encrypted password
   * @param {string} iv - Initialization vector
   * @returns {string} - Decrypted password
   */
  decrypt(encrypted, iv) {
    try {
      const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        crypto.scryptSync(this.secretKey, 'salt', 32),
        Buffer.from(iv, 'hex')
      );

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (err) {
      throw new Error('Decryption failed');
    }
  }

  /**
   * Hash password for blockchain storage
   * @param {string} password - Password to hash
   * @returns {string} - Hash
   */
  hashForBlockchain(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  /**
   * Generate random password
   * @param {number} length - Password length
   * @returns {string} - Random password
   */
  generateRandomPassword(length = 16) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }
}

module.exports = new EncryptionService();
