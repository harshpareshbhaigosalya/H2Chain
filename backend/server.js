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
