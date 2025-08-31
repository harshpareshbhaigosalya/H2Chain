import express from "express";
import multer from "multer";
import HydrogenRequest from "../models/HydrogenRequest.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Submit hydrogen generation request
import User from "../models/User.js";

router.post("/generate", verifyToken, upload.fields([
  { name: "ppa", maxCount: 1 },
  { name: "eac", maxCount: 1 },
  { name: "generationLogs", maxCount: 1 },
  { name: "auditorReport", maxCount: 1 },
  { name: "certificate", maxCount: 1 },
]), async (req, res) => {
  try {
    const { amount, certificateType } = req.body;
    const firebaseUid = req.user.uid;
    const userDoc = await User.findOne({ firebaseUid });
    if (!userDoc) return res.status(400).json({ message: "User not found" });
    const userId = userDoc._id;
    const ppa = req.files["ppa"]?.[0]?.path;
    const eac = req.files["eac"]?.[0]?.path;
    const generationLogs = req.files["generationLogs"]?.[0]?.path;
    const auditorReport = req.files["auditorReport"]?.[0]?.path;
    const certificate = req.files["certificate"]?.[0]?.path;
    if (!ppa || !generationLogs || !auditorReport || !certificate) {
      return res.status(400).json({ message: "All required documents must be uploaded." });
    }
    const request = new HydrogenRequest({
      user: userId,
      amount,
      certificateType,
      ppa,
      eac,
      generationLogs,
      auditorReport,
      certificate,
      status: "pending",
    });
    await request.save();
    res.json({ message: "Hydrogen generation request submitted!", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
