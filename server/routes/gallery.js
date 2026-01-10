import express from "express";
import Gallery from "../models/Gallery.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* GET – public */
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gallery" });
  }
});

/* POST – admin only */
router.post(
  "/",
  adminAuth,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image required" });
      }

      const image = await Gallery.create({
        image: req.file.path,   // ✅ Cloudinary URL
        caption: req.body.caption,
      });

      res.status(201).json(image);
    } catch (err) {
      res.status(500).json({ message: "Failed to upload image" });
    }
  }
);

/* DELETE – admin only */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete image" });
  }
});

export default router;
