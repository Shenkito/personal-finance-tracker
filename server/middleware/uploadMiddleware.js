import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "profile_pictures", // Cloudinary folder where images will be stored
        allowedFormats: ["jpg", "jpeg", "png"],
    },
});

const upload = multer({ storage });

export default upload;
