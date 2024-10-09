// controllers/webtoonController.js
const Webtoon = require('../models/Webtoon'); // Import the Webtoon model

// Get all webtoons
const getAllWebtoons = async (req, res) => {
  try {
    const webtoons = await Webtoon.find(); // Fetch all webtoons from the database
    res.json(webtoons); // Send the webtoons as a response
  } catch (error) {
    res.status(500).json({ message: 'Server error' }); // Handle server error
  }
};

// Get a webtoon by ID
const getWebtoonById = async (req, res) => {
  const { id } = req.params; // Get ID from request parameters
  try {
    const webtoon = await Webtoon.findById(id); // Find webtoon by ID
    if (!webtoon) {
      return res.status(404).json({ message: 'Webtoon not found' }); // Handle not found
    }
    res.json(webtoon); // Send the found webtoon
  } catch (error) {
    res.status(500).json({ message: 'Server error' }); // Handle server error
  }
};

// Create a new webtoon
const createWebtoon = async (req, res) => {
  const { title, description, characters } = req.body; // Get data from request body
  const newWebtoon = new Webtoon({ title, description, characters }); // Create new webtoon instance

  try {
    await newWebtoon.save(); // Save to database
    res.status(201).json(newWebtoon); // Send created webtoon as response
  } catch (error) {
    res.status(500).json({ message: 'Server error' }); // Handle server error
  }
};

// Delete a webtoon by ID
const deleteWebtoonById = async (req, res) => {
  const { id } = req.params; // Get ID from request parameters
  try {
    const deletedWebtoon = await Webtoon.findByIdAndDelete(id); // Delete webtoon by ID
    if (!deletedWebtoon) {
      return res.status(404).json({ message: 'Webtoon not found' }); // Handle not found
    }
    res.json({ message: 'Webtoon deleted successfully' }); // Send success message
  } catch (error) {
    res.status(500).json({ message: 'Server error' }); // Handle server error
  }
};

// Export all functions
module.exports = {
  getAllWebtoons,
  getWebtoonById,
  createWebtoon,
  deleteWebtoonById,
};
