import mongoose from "mongoose";

const HydrogenRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  certificateType: { type: String, required: true },
  documents: [{ type: String }],
  certificate: { type: String },
  status: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("HydrogenRequest", HydrogenRequestSchema);
