import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Register new user or return existing
router.post("/register", async (req, res) => {
  try {
    const { firebaseUid, name, email } = req.body;

    // Validate required fields
    if (!firebaseUid || !email) {
      return res.status(400).json({
        message: "firebaseUid and email are required fields"
      });
    }

    let user = await User.findOne({ firebaseUid });

    // Create new user if not found
    if (!user) {
      user = await User.create({
        firebaseUid,
        name: name || "",
        email,
        role: email === "admin@gmail.com" ? "admin" : "user",
      });
    }

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
