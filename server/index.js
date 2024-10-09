import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import fs from "fs"; // Add this to ensure the uploads directory exists

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import upload from "./utils/upload.js"; // Import the multer configuration

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads folder exists
const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Add a route to handle profile picture uploads
app.post("/api/upload", upload.single("profilePicture"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    // The URL to access the uploaded file
    const profilePictureUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(200).json({ profilePictureUrl });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}...`);
});
