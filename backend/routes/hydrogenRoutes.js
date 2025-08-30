import express from "express";
import multer from "multer";
import HydrogenRequest from "../models/HydrogenRequest.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Submit hydrogen generation request
import User from "../models/User.js";

router.post("/generate", verifyToken, upload.fields([
  { name: "documents", maxCount: 10 },
  { name: "certificate", maxCount: 1 },
]), async (req, res) => {
  try {
    const { amount, certificateType } = req.body;
    // Find user by Firebase UID from decoded token
    const firebaseUid = req.user.uid;
    const userDoc = await User.findOne({ firebaseUid });
    if (!userDoc) return res.status(400).json({ message: "User not found" });
    const userId = userDoc._id;
    const documents = req.files["documents"] || [];
    const certificate = req.files["certificate"]?.[0] || null;
    const request = new HydrogenRequest({
      user: userId,
      amount,
      certificateType,
      documents: documents.map(f => f.path),
      certificate: certificate?.path,
      status: "pending",
    });
    await request.save();
    res.json({ message: "Hydrogen generation request submitted!", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
