import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin2025", 10);

  await Admin.create({
    email: "admin2025@vyom.com",
    password: hashedPassword
  });

  console.log("✅ Admin created");
  process.exit();
};

createAdmin();
