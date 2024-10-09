require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const webtoonRoutes = require('./routes/webtoonRoutes');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const { connectDB } = require('./config/db');

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON parsing

connectDB(); // Connect to MongoDB

// Define routes
app.use('/api/webtoons', webtoonRoutes);
app.use('/api/auth', authRoutes); // Use authentication routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
