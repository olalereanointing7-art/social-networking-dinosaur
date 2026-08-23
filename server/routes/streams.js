const express = require('express');
const Stream = require('../models/Stream');
const User = require('../models/User');
const router = express.Router();

// Start stream
router.post('/start', async (req, res) => {
  try {
    const { streamerId, title, description, type } = req.body;

    const stream = new Stream({
      streamer: streamerId,
      title,
      description,
      type: type || 'video'
    });

    await stream.save();
    await stream.populate('streamer', 'username profilePicture');

    res.status(201).json({ message: 'Stream started', stream });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// End stream
router.put('/:streamId/end', async (req, res) => {
  try {
    const stream = await Stream.findByIdAndUpdate(
      req.params.streamId,
      { isLive: false, endedAt: new Date() },
      { new: true }
    );

    res.json({ message: 'Stream ended', stream });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get live streams
router.get('/live', async (req, res) => {
  try {
    const streams = await Stream.find({ isLive: true })
      .populate('streamer', 'username profilePicture')
      .sort({ startedAt: -1 });

    res.json(streams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Join stream
router.post('/:streamId/join', async (req, res) => {
  try {
    const { userId } = req.body;
    const stream = await Stream.findByIdAndUpdate(
      req.params.streamId,
      {
        $addToSet: { viewers: userId },
        $inc: { viewCount: 1 }
      },
      { new: true }
    );

    res.json({ message: 'Joined stream', stream });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send gift
router.post('/:streamId/gift', async (req, res) => {
  try {
    const { senderId, giftType, amount } = req.body;
    const stream = await Stream.findByIdAndUpdate(
      req.params.streamId,
      {
        $push: {
          gifts: {
            sender: senderId,
            giftType,
            amount,
            createdAt: new Date()
          }
        },
        $inc: { totalEarnings: amount }
      },
      { new: true }
    );

    // Update streamer earnings
    await User.findByIdAndUpdate(
      stream.streamer,
      { $inc: { totalEarnings: amount * 0.5 } }
    );

    res.json({ message: 'Gift sent', stream });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
