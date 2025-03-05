// // utils/ensureUploadsFolder.js
// import path from "path";
// import fs from "fs";

// import { fileURLToPath } from "url";

// // Get the current directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Function to ensure the uploads folder exists
// export const ensureUploadsFolder = () => {
//     const uploadsPath = path.join(__dirname, "..", "uploads"); // Go up one level to the server root

//     // Check if the uploads folder exists
//     if (!fs.existsSync(uploadsPath)) {
//         fs.mkdirSync(uploadsPath); // Create the folder if it doesn't exist
//         console.log("Uploads folder created at:", uploadsPath);
//     } else {
//         console.log("Uploads folder already exists at:", uploadsPath);
//     }
// };
