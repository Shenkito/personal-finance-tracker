// // routes/uploadRoutes.js
// import express from "express";
// import upload from "../utils/upload.js"; // Import your multer configuration

// import { uploadProfilePicture } from "../controllers/uploadController.js"; // Import the controller

// const router = express.Router();

// router.post("/upload", upload.single("profilePicture"), uploadProfilePicture);

// export default router;

import express from "express";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", upload.single("profilePicture"), async (req, res) => {
    try {
        res.json({ imageUrl: req.file.path }); // Cloudinary provides the URL
    } catch (error) {
        res.status(500).json({ error: "Image upload failed" });
    }
});

export default router;
