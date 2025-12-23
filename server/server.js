import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import blogRoutes from "./routes/blogs.js";
import galleryRoutes from "./routes/gallery.js";
import adminRoutes from "./routes/admin.js";
import eventRoutes from "./routes/events.js";



dotenv.config();

/* =======================
   CREATE APP FIRST
======================= */
const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   STATIC FILES
======================= */
app.use("/uploads", express.static("uploads"));

/* =======================
   ROUTES
======================= */
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);

/* =======================
   DATABASE
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
