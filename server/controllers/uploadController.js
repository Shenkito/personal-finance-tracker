// controllers/uploadController.js

export const uploadProfilePicture = async (req, res) => {

    try {
        // Check if a file is uploaded
        if (!req.file) {

            return res.status(400).json({ message: "No file uploaded" });

        }

        // Create the profile picture URL (path to the file)
        const profilePictureUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        // Respond with the profile picture URL
        res.status(201).json({ profilePictureUrl });

    } catch (error) {
        // Handle any potential errors
        console.error("Error uploading file:", error.message);
        res.status(500).json({ message: "Internal server error" });

    }
};
