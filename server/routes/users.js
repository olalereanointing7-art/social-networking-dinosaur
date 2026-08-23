const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('followers', 'username profilePicture')
      .populate('following', 'username profilePicture')
      .select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
router.put('/:userId/update', async (req, res) => {
  try {
    const { bio, profilePicture } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { bio, profilePicture },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Follow user
router.post('/:userId/follow', async (req, res) => {
  try {
    const { currentUserId } = req.body;
    const userToFollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (currentUser.following.includes(req.params.userId)) {
      currentUser.following = currentUser.following.filter(
        id => id.toString() !== req.params.userId
      );
      userToFollow.followers = userToFollow.followers.filter(
        id => id.toString() !== currentUserId
      );
    } else {
      currentUser.following.push(req.params.userId);
      userToFollow.followers.push(currentUserId);
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({ message: 'Follow toggled', following: currentUser.following.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search users
router.get('/search/:query', async (req, res) => {
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: req.params.query, $options: 'i' } },
        { email: { $regex: req.params.query, $options: 'i' } }
      ]
    }).select('-password').limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
