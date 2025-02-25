import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { ensureUploadsFolder } from "./utils/ensureUploadsFolder.js";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js"
// import uploadRoutes from "./routes/uploadRoutes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname1 = path.dirname(__filename);
const __dirname2 = path.resolve();


ensureUploadsFolder()

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname1, "uploads"), {
    setHeaders: (res, path) => {
      res.setHeader("Cache-Control", "no-store"); // Prevent caching
    }
  }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes)
// app.use("/api/upload", uploadRoutes)

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname2, "/client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname2, "client", "dist", "index.html"));
})

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}...`);
});
