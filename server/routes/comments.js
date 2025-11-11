// routes/comments.js
import express from 'express';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a comment
router.post('/:postId', protect, async (req, res) => {
  try {
    const comment = new Comment({
      post: req.params.postId,
      author: req.user.id,
      content: req.body.content,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
