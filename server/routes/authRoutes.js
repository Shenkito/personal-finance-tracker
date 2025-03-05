import express from "express";
import { signUp, login, logout } from "../controllers/authController.js";

import upload from "../middleware/uploadMiddleware.js"; // Import the upload middleware

const router = express.Router();

router.post("/signup", upload.single("profilePicture"), signUp); // Ensure to use the upload middleware

router.post("/login", login);

router.post("/logout", logout);

export default router;