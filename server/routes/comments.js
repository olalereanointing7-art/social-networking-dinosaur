const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const router = express.Router();

// Add comment to post
router.post('/create', async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const comment = new Comment({
      post: postId,
      author: userId,
      content
    });

    await comment.save();
    await comment.populate('author', 'username profilePicture');

    // Add comment to post
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment._id } },
      { new: true }
    );

    res.status(201).json({ message: 'Comment added', comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comments for post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username profilePicture')
      .populate('replies')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like comment
router.post('/:commentId/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.likes.includes(userId)) {
      comment.likes = comment.likes.filter(id => id.toString() !== userId);
    } else {
      comment.likes.push(userId);
    }

    await comment.save();
    res.json({ message: 'Like toggled', likes: comment.likes.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete comment
router.delete('/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Remove from post
    await Post.findByIdAndUpdate(
      comment.post,
      { $pull: { comments: req.params.commentId } }
    );

    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
