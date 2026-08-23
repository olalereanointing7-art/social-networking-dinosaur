const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find({ isActive: true })
      .populate('players', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get game by category
router.get('/category/:category', async (req, res) => {
  try {
    const games = await Game.find({ 
      category: req.params.category,
      isActive: true 
    }).populate('players', 'username profilePicture');

    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Join game
router.post('/:gameId/join', async (req, res) => {
  try {
    const { userId } = req.body;
    const game = await Game.findByIdAndUpdate(
      req.params.gameId,
      { $addToSet: { players: userId } },
      { new: true }
    ).populate('players', 'username profilePicture');

    res.json({ message: 'Joined game', game });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leave game
router.post('/:gameId/leave', async (req, res) => {
  try {
    const { userId } = req.body;
    const game = await Game.findByIdAndUpdate(
      req.params.gameId,
      { $pull: { players: userId } },
      { new: true }
    ).populate('players', 'username profilePicture');

    res.json({ message: 'Left game', game });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create game (admin only)
router.post('/create', async (req, res) => {
  try {
    const { name, description, thumbnail, category } = req.body;

    const game = new Game({
      name,
      description,
      thumbnail,
      category
    });

    await game.save();
    res.status(201).json({ message: 'Game created', game });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
