
import express from "express";
const router = express.Router();
import CoinTransaction from "../models/CoinTransaction.js";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import HydrogenRequest from "../models/HydrogenRequest.js";

// Admin/auditor: approve coin transaction
router.post("/admin/approve-transaction/:id", verifyToken, async (req, res) => {
  try {
    const transaction = await CoinTransaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    transaction.status = "completed";
    await transaction.save();
    res.json({ message: "Transaction approved and completed", transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin/auditor: approve hydrogen request and credit coins
router.post("/admin/approve-hydrogen/:id", verifyToken, async (req, res) => {
  try {
    const request = await HydrogenRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Hydrogen request not found" });
    request.status = "verified";
    await request.save();
    // Credit coins to user (1 coin per kg for example)
    const user = await User.findById(request.user);
    const coins = request.amount;
    const transaction = await CoinTransaction.create({
      user: user._id,
      type: "buy",
      coins,
      pricePerCoin: 0,
      totalAmount: 0,
      status: "completed",
      createdAt: new Date(),
    });
    res.json({ message: "Hydrogen request approved and coins credited", request, transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// REMOVE duplicate router declaration

// Get coin summary and transactions for logged-in user
router.get("/me/coins", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Aggregate coin stats
    const transactions = await CoinTransaction.find({ user: user._id }).sort({ createdAt: -1 });
    const coinsBought = transactions.filter(t => t.type === "buy").reduce((sum, t) => sum + t.coins, 0);
    const coinsSold = transactions.filter(t => t.type === "sell").reduce((sum, t) => sum + t.coins, 0);
    const currentCoins = coinsBought - coinsSold;
    const totalLifetimeCoins = coinsBought;
    const purchasedCoins = coinsBought;

    res.json({
      currentCoins,
      coinsSold,
      purchasedCoins,
      totalLifetimeCoins,
      transactions,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Request to buy coins
router.post("/me/coins/buy", verifyToken, async (req, res) => {
  try {
    console.log('Buy route hit');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      console.log('User not found for UID:', req.user.uid);
      return res.status(404).json({ message: "User not found" });
    }
    const { coins, pricePerCoin } = req.body;
    if (!coins || !pricePerCoin) {
      console.log('Missing coins or price:', req.body);
      return res.status(400).json({ message: "Missing coins or price" });
    }

    const transaction = await CoinTransaction.create({
      user: user._id,
      type: "buy",
      coins,
      pricePerCoin,
      totalAmount: coins * pricePerCoin,
      status: "pending",
    });
    console.log('Transaction created:', transaction);
    res.json(transaction);
  } catch (error) {
    console.log('Error in buy route:', error);
    res.status(500).json({ message: error.message });
  }
});

// Request to sell coins
router.post("/me/coins/sell", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    const { coins, pricePerCoin, buyerId } = req.body;
    if (!coins || !pricePerCoin || !buyerId) return res.status(400).json({ message: "Missing coins, price, or buyer" });

    // Check if user has enough coins
    const transactions = await CoinTransaction.find({ user: user._id });
    const coinsBought = transactions.filter(t => t.type === "buy").reduce((sum, t) => sum + t.coins, 0);
    const coinsSold = transactions.filter(t => t.type === "sell").reduce((sum, t) => sum + t.coins, 0);
    const currentCoins = coinsBought - coinsSold;
    if (currentCoins < coins) return res.status(400).json({ message: "Not enough coins to sell" });

    const transaction = await CoinTransaction.create({
      user: user._id,
      type: "sell",
      coins,
      pricePerCoin,
      totalAmount: coins * pricePerCoin,
      counterparty: buyerId,
      status: "pending",
    });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List all coin purchase requests (for marketplace)
router.get("/marketplace/coin-requests", verifyToken, async (req, res) => {
  try {
    const requests = await CoinTransaction.find({ type: "buy", status: "pending" }).populate("user");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
