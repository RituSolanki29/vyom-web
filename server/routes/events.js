import express from "express";
import Event from "../models/Event.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/**
 * GET /api/events
 * Public – fetch all events/projects
 */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

/**
 * POST /api/events
 * Admin only – add event/project
 */
router.post(
  "/",
  adminAuth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, date, contributors } = req.body;

      if (!title || !description || !req.file) {
        return res.status(400).json({ message: "All fields required" });
      }

      const event = await Event.create({
        title,
        description,
        date,
        contributors,
        image: req.file.path, // ✅ CLOUDINARY URL
      });

      res.status(201).json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create event" });
    }
  }
);

/**
 * DELETE /api/events/:id
 * Admin only – delete event
 */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event" });
  }
});

export default router;
