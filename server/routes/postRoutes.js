import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import Post from "../models/Post.js";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public routes
router.get("/", getPosts);
router.get("/:id", getPostById);

// ✅ Multer setup with auto-folder creation
const uploadDir = path.join(process.cwd(), "uploads");

// Ensure 'uploads' folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ✅ Protected routes (require token)
router.post("/", protect, upload.single("image"), createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
