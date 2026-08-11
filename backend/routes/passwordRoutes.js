const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, passwordController.getAllPasswords);
router.post('/', authMiddleware, passwordController.createPassword);
router.delete('/:id', authMiddleware, passwordController.deletePassword);
router.put('/:id', authMiddleware, passwordController.updatePassword);
router.get('/strength/:id', authMiddleware, passwordController.getPasswordStrength);

module.exports = router;
