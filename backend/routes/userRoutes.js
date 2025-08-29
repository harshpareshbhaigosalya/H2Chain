import express from "express";
import User from "../models/user.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin-only route
router.get("/admin", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const users = await User.find();
    res.json({ message: "Admin Panel Data", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
