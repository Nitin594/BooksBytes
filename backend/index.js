import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import  connectDB  from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js"
import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", bookRoutes)


// Example Protected Route
app.get("/api/profile", verifyToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
