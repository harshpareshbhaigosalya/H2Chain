<<<<<<< HEAD
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import coinRoutes from "./routes/coinRoutes.js";
import hydrogenRoutes from "./routes/hydrogenRoutes.js";
import hydrogenUserRoutes from "./routes/hydrogenUserRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/coins", coinRoutes);
app.use("/api/hydrogen", hydrogenRoutes);
app.use("/api/hydrogen", hydrogenUserRoutes);
app.use("/api/admin", adminRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Catch-all route for debugging unmatched requests
app.use((req, res, next) => {
  console.log("Unmatched request:", req.method, req.originalUrl);
  res.status(404).json({ message: "Route not found", path: req.originalUrl });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ---------------- Simulated Blockchain Storage ----------------
let batchStore = [];  // Stores all batches
let batchIdCounter = 0;

// Utility to generate immutable hash (simple simulation)
const crypto = require("crypto");
function generateHash(batch) {
  return crypto.createHash("sha256").update(JSON.stringify(batch)).digest("hex");
}

// ---------------- PRODUCER ----------------
app.post("/createBatch", (req, res) => {
  const { name, amount } = req.body;
  const batch = {
    id: batchIdCounter++,
    producer: "Producer A",
    name,
    amount,
    status: "Pending",
    timestamp: new Date().toLocaleString(),
    hash: "" // to store hash
  };
  batch.hash = generateHash(batch); // simulate blockchain immutability
  batchStore.push(batch);
  res.json({ success: true, batch });
});

// ---------------- CERTIFIER ----------------
app.post("/certifyBatch", (req, res) => {
  const { batchId } = req.body;
  const batch = batchStore.find(b => b.id == batchId);
  if (!batch) return res.json({ success: false, message: "Batch not found" });
  if (batch.status !== "Pending") return res.json({ success: false, message: "Batch already processed" });

  batch.status = "Certified";
  batch.hash = generateHash(batch); // update hash to simulate blockchain logging
  res.json({ success: true, batch });
});

// ---------------- BUYER ----------------
app.post("/transferBatch", (req, res) => {
  const { batchId, to } = req.body;
  const batch = batchStore.find(b => b.id == batchId);
  if (!batch) return res.json({ success: false, message: "Batch not found" });
  if (batch.status !== "Certified") return res.json({ success: false, message: "Batch not certified yet" });

  batch.status = `Transferred to ${to}`;
  batch.hash = generateHash(batch); // simulate blockchain hash update
  res.json({ success: true, batch });
});

app.post("/retireBatch", (req, res) => {
  const { batchId } = req.body;
  const batch = batchStore.find(b => b.id == batchId);
  if (!batch) return res.json({ success: false, message: "Batch not found" });
  if (!batch.status.startsWith("Transferred") && batch.status !== "Certified") return res.json({ success: false, message: "Batch cannot be retired" });

  batch.status = "Retired";
  batch.hash = generateHash(batch);
  res.json({ success: true, batch });
});

// ---------------- REGULATOR ----------------
app.get("/getAllBatches", (req, res) => {
  res.json(batchStore);
});

// ---------------- FRAUD SIMULATION ----------------
app.post("/simulateFraud", (req, res) => {
  if (batchStore.length === 0) {
    return res.json({ alert: false, message: "No batches to attack" });
  }
  const alert = true; // Simulate blockchain preventing tampering
  res.json({ alert, message: "Hacker attempted to reuse a batch! Blockchain prevented double-spending." });
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
>>>>>>> 8529ff8c015a51d33fd8da31f15fe1aedfa7da2f
