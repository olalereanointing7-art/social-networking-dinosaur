const mongoose = require('mongoose');

const GiftSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['rose', 'heart', 'diamond', 'crown', 'star', 'fire', 'gift'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  icon: String,
  description: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gift', GiftSchema);
