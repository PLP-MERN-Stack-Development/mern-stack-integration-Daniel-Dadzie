import Post from "../models/Post.js";
import Category from "../models/Category.js";

// Create Post (protected)
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Ensure required fields
    if (!title || !content || !category) {
      return res.status(400).json({ message: "Title, content, and category are required" });
    }

    // Convert category name to ObjectId if needed
    let categoryId;
    if (category.match(/^[0-9a-fA-F]{24}$/)) {
      categoryId = category;
    } else {
      const foundCategory = await Category.findOne({ name: category });
      if (!foundCategory) return res.status(400).json({ message: "Invalid category name" });
      categoryId = foundCategory._id;
    }

    // Handle uploaded image (from multer)
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Use logged-in user's username as author
    const post = new Post({
      title,
      content,
      category: categoryId,
      author: req.user.username,
      image,
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Error creating post" });
  }
};

// Update Post (protected)
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only author can update
    if (post.author !== req.user.username) {
      return res.status(403).json({ message: "You can only update your own posts" });
    }

    const { title, content, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : post.image;

    if (title) post.title = title;
    if (content) post.content = content;
    if (category) {
      let categoryId;
      if (category.match(/^[0-9a-fA-F]{24}$/)) categoryId = category;
      else {
        const foundCategory = await Category.findOne({ name: category });
        if (!foundCategory) return res.status(400).json({ message: "Invalid category name" });
        categoryId = foundCategory._id;
      }
      post.category = categoryId;
    }
    post.image = image;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ message: "Error updating post" });
  }
};

// Delete Post (protected)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only author can delete
    if (post.author !== req.user.username) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ message: "Error deleting post" });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("category", "name").sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
