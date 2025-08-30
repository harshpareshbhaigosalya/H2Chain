import express from "express";
import HydrogenRequest from "../models/HydrogenRequest.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Get hydrogen requests for logged-in user
router.get("/my-requests", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    const requests = await HydrogenRequest.find({ user: user._id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
