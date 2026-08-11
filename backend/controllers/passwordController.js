const Password = require('../models/Password');
const User = require('../models/User');

exports.getAllPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.userId });
    res.json(passwords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPassword = async (req, res) => {
  try {
    const { website, username, password } = req.body;

    if (!website || !username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newPassword = new Password({
      userId: req.userId,
      website,
      username,
      password,
    });

    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePassword = async (req, res) => {
  try {
    const { id } = req.params;

    const password = await Password.findById(id);
    if (!password) {
      return res.status(404).json({ message: 'Password not found' });
    }

    // Check if user owns this password
    if (password.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Password.findByIdAndDelete(id);
    res.json({ message: 'Password deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { website, username, password } = req.body;

    let passwordRecord = await Password.findById(id);
    if (!passwordRecord) {
      return res.status(404).json({ message: 'Password not found' });
    }

    // Check if user owns this password
    if (passwordRecord.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (website) passwordRecord.website = website;
    if (username) passwordRecord.username = username;
    if (password) passwordRecord.password = password;
    passwordRecord.updatedAt = new Date();

    await passwordRecord.save();
    res.json(passwordRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPasswordStrength = async (req, res) => {
  try {
    const { id } = req.params;

    const password = await Password.findById(id);
    if (!password) {
      return res.status(404).json({ message: 'Password not found' });
    }

    // Calculate strength
    const strength = calculatePasswordStrength(password.password);

    res.json({
      id: password._id,
      website: password.website,
      strength,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

function calculatePasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 2;

  const percentage = Math.min((score / 8) * 100, 100);
  let level = 'Weak';
  if (percentage >= 75) level = 'Very Strong';
  else if (percentage >= 60) level = 'Strong';
  else if (percentage >= 40) level = 'Fair';

  return {
    score,
    level,
    percentage: percentage.toFixed(1),
  };
}
