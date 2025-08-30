// Approve hydrogen request and credit coins
router.post("/hydrogenrequests/:id/approve", verifyToken, async (req, res) => {
  try {
    const request = await HydrogenRequest.findById(req.params.id).populate("user");
    if (!request) return res.status(404).json({ message: "Hydrogen request not found" });
    if (request.status !== "pending") return res.status(400).json({ message: "Request already processed" });
    request.status = "verified";
    await request.save();
    // Credit coins to user (1 coin per kg hydrogen)
    const coins = request.amount;
    const transaction = await CoinTransaction.create({
      user: request.user._id,
      type: "buy",
      coins,
      pricePerCoin: 0,
      totalAmount: 0,
      status: "completed",
      createdAt: new Date(),
    });
    // Log action
    console.log(`Hydrogen request ${request._id} approved by admin/auditor. ${coins} coins credited to user ${request.user.email}`);
    res.json({ message: "Hydrogen request approved and coins credited", request, transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject hydrogen request
router.post("/hydrogenrequests/:id/reject", verifyToken, async (req, res) => {
  try {
    const request = await HydrogenRequest.findById(req.params.id).populate("user");
    if (!request) return res.status(404).json({ message: "Hydrogen request not found" });
    if (request.status !== "pending") return res.status(400).json({ message: "Request already processed" });
    request.status = "rejected";
    await request.save();
    // Log action
    console.log(`Hydrogen request ${request._id} rejected by admin/auditor.`);
    res.json({ message: "Hydrogen request rejected", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get documents for a hydrogen request
router.get("/hydrogenrequests/:id/documents", verifyToken, async (req, res) => {
  try {
    const request = await HydrogenRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Hydrogen request not found" });
    res.json({ documents: request.documents, certificate: request.certificate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
import HydrogenRequest from "../models/HydrogenRequest.js";
import CoinTransaction from "../models/CoinTransaction.js";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";

// Get all hydrogen requests (with user info)
router.get("/hydrogenrequests", verifyToken, async (req, res) => {
  try {
    const requests = await HydrogenRequest.find().populate("user");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all coin transactions (with user and counterparty info)
router.get("/cointransactions", verifyToken, async (req, res) => {
  try {
    const transactions = await CoinTransaction.find().populate("user counterparty");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
import express from "express";
import User from "../models/User.js";
import CoinTransaction from "../models/CoinTransaction.js";
import HydrogenRequest from "../models/HydrogenRequest.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Middleware to ensure the user is an auditor
const isAuditor = async (req, res, next) => {
  const userEmail = req.user?.email;
  if (userEmail === "auditor@gmail.com") {
    return next();
  }
  return res.status(403).json({ message: "Access denied — Auditors only" });
};

// Auditor: Get summary of all data
router.get("/auditor/overview", verifyToken, isAuditor, async (req, res) => {
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
