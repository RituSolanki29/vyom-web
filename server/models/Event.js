import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  contributors: String,
  image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
