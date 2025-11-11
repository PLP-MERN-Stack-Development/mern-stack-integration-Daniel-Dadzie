// --- server/server.js ---
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import comments from "./routes/comments.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.get("/", (req, res) => res.send("Backend API is running"));
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

app.use("/api/auth", authRoutes);

// add comments routes
// app.use("/api/comments", import("./routes/commentRoutes.js").then(module => module.default));
app.use("/api/comments", comments);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Error Handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
