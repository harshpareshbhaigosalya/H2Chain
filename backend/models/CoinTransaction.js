// models/CoinTransaction.js
import mongoose from "mongoose";

const coinTransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["buy", "sell"], required: true },
  coins: { type: Number, required: true },
  pricePerCoin: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  counterparty: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // buyer/seller
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("CoinTransaction", coinTransactionSchema);
