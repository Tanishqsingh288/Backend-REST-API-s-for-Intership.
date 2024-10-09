const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const User = require('../models/User'); // Import User model
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to validate request body
const validateRegisterInput = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  next();
};

// Register route to create a new user
router.post('/register', validateRegisterInput, async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = new User({ username, password: hashedPassword });
    await user.save(); // Save user to database
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

// Login route to authenticate user and generate JWT
router.post('/login', validateRegisterInput, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "f1e5d8f10c8e43a9b0159b0e50ebc47c637f7d5e8a84d2e30c754f7fdd5431a0a5", { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

module.exports = router; // Export the router
