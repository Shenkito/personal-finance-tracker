import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory name for ES Modules
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the uploads directory path relative to the server folder
        const uploadsPath = path.join(__dirname, "../uploads"); // Stay in the server folder and go to the uploads directory
        cb(null, uploadsPath); // Use the specified uploads directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Store the file with a unique name
    },
});

// Initialize multer for file uploads
const upload = multer({ storage });

export default upload;
