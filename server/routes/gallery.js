import express from "express";
import Gallery from "../models/Gallery.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* GET – public */
router.get("/", async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });
  res.json(images);
});

/* POST – admin only */
router.post(
  "/",
  adminAuth,
  upload.single("image"),
  async (req, res) => {
    const image = await Gallery.create({
      image: req.file.filename,
      caption: req.body.caption
    });
    res.status(201).json(image);
  }
);

/* DELETE – admin only */
router.delete("/:id", adminAuth, async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
