const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  thumbnail: String,
  category: {
    type: String,
    enum: ['sports', 'cards', 'racing', 'puzzle', 'strategy'],
    required: true
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  maxPlayers: {
    type: Number,
    default: 2
  },
  isActive: {
    type: Boolean,
    default: true
  },
  version: {
    type: String,
    default: '1.0.0'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', GameSchema);
