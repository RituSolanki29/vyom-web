import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Admin access required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default adminAuth;
