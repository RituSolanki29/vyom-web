import express from "express";
import Blog from "../models/Blog.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/**
 * GET /api/blogs
 * Public – fetch all blogs
 */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

/**
 * POST /api/blogs
 * Public – anyone can add blog
 */
router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blog = await Blog.create({
      title,
      content,
      author
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to create blog" });
  }
});

/**
 * DELETE /api/blogs/:id
 * Admin only – delete blog
 */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted by admin" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

export default router;
