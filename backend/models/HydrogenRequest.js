import mongoose from "mongoose";

const HydrogenRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  certificateType: { type: String, required: true },
  // Specific document types for renewable verification
  ppa: { type: String, required: true }, // Power Purchase Agreement
  eac: { type: String }, // Energy Attribute Certificates (optional)
  generationLogs: { type: String, required: true }, // On-site Renewable Generation Logs
  auditorReport: { type: String, required: true }, // Third-party Auditor Report
  certificate: { type: String, required: true },
  status: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("HydrogenRequest", HydrogenRequestSchema);
