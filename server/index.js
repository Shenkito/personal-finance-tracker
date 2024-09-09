import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

// app.get('/', (req, res) => {
//     res.send('Server is running!');
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server is running on port ${PORT}...`);
});