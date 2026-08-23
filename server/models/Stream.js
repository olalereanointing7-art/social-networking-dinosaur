const mongoose = require('mongoose');

const StreamSchema = new mongoose.Schema({
  streamer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  thumbnail: String,
  type: {
    type: String,
    enum: ['video', 'audio'],
    default: 'video'
  },
  isLive: {
    type: Boolean,
    default: true
  },
  viewers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  viewCount: {
    type: Number,
    default: 0
  },
  hostedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  gifts: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      giftType: String,
      amount: Number,
      createdAt: Date
    }
  ],
  totalEarnings: {
    type: Number,
    default: 0
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: Date,
  recording: {
    url: String,
    duration: Number
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: String,
      createdAt: Date
    }
  ]
});

module.exports = mongoose.model('Stream', StreamSchema);
