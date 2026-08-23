const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

// Get all posts (feed)
router.get('/feed', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username profilePicture')
      .populate('comments')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create post
router.post('/create', async (req, res) => {
  try {
    const { userId, content, image, video } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const post = new Post({
      author: userId,
      content,
      image,
      video
    });

    await post.save();
    await post.populate('author', 'username profilePicture');

    res.status(201).json({ message: 'Post created', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like post
router.post('/:postId/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ message: 'Like toggled', likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete post
router.delete('/:postId', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
