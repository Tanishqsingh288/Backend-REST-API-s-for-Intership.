const express = require('express');
const { check, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit'); // Import rate limiter
const {
  getAllWebtoons,
  getWebtoonById,
  createWebtoon,
  deleteWebtoonById,
} = require('../controllers/webtoonController');
const auth = require('../middleware/auth');

const router = express.Router();

// Rate limiter for POST and DELETE routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

// GET /api/webtoons - Get all webtoons
router.get('/', getAllWebtoons);

// GET /api/webtoons/:id - Get a webtoon by ID
router.get('/:id', getWebtoonById);

// POST /api/webtoons - Create a new webtoon (protected route)
router.post(
  '/',
  limiter, // Apply rate limiting
  [
    auth, // Ensure the user is authenticated
    check('title').notEmpty().withMessage('Title is required'), // Validate title
    check('description').notEmpty().withMessage('Description is required'), // Validate description
    check('characters').isArray().withMessage('Characters should be an array'), // Validate characters
  ],
  (req, res, next) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return errors if any
    }
    next(); // Continue to create the webtoon
  },
  createWebtoon // Create a new webtoon
);

// DELETE /api/webtoons/:id - Delete a webtoon by ID (protected route)
router.delete('/:id', limiter, auth, deleteWebtoonById); // Apply rate limiting

module.exports = router; // Export the router
