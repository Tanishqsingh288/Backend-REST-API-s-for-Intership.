// middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware to check JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' }); // No token found
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "f1e5d8f10c8e43a9b0159b0e50ebc47c637f7d5e8a84d2e30c754f7fdd5431a0a5"); // Verify token
    req.user = decoded; // Attach user data to request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' }); // Token verification failed
  }
};

module.exports = auth; // Export the middleware
