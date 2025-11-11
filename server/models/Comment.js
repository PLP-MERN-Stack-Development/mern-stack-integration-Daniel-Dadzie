import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  name: String,
  email: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// This prevents OverwriteModelError
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
