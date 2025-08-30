// routes/adminRoutes.js
import express from "express";
import User from "../models/User.js";
import CoinTransaction from "../models/CoinTransaction.js";
import HydrogenRequest from "../models/HydrogenRequest.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Middleware to ensure the user is an admin
const isAdmin = async (req, res, next) => {
  const userEmail = req.user?.email;
  if (userEmail === "admin@gmail.com") {
    return next();
  }
  return res.status(403).json({ message: "Access denied — Admins only" });
};

// Admin: Get all users
router.get("/admin/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get everything (users, transactions, requests)
router.get("/admin/all-data", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    const transactions = await CoinTransaction.find().populate("user counterparty");
    const hydrogenRequests = await HydrogenRequest.find().populate("user");
    res.json({ users, transactions, hydrogenRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
