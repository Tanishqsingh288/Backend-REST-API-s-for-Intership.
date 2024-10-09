// models/Webtoon.js
const mongoose = require('mongoose');

// Create Webtoon schema
const webtoonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  characters: { type: [String], required: true }, // Array of character names
});

// Create model
const Webtoon = mongoose.model('Webtoon', webtoonSchema);

module.exports = Webtoon; // Export the Webtoon model
