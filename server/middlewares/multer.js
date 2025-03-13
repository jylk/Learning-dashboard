// import multer, { diskStorage } from "multer";

// const storage = diskStorage({
//     filename: function (req, file, cb) {
//         console.log('file===',file);
        
//         cb(null, file.originalname);
//     },
// });

// // Define file filter to accept image and video file types
// const fileFilter = (req, file, cb) => {
//     const allowedMimeTypes = [
//         // Image MIME types
//         'image/jpeg',    // JPEG
//         'image/png',     // PNG
//         'image/gif',     // GIF
//         'image/webp',    // WebP
//         'image/bmp',     // BMP
//         'image/svg+xml', // SVG

//         // Video MIME types
//         'video/mp4',     // MP4
//         'video/mpeg',    // MPEG
//         'video/ogg',     // OGG
//         'video/webm',    // WebM
//     ];
    
//     if (allowedMimeTypes.includes(file.mimetype)) {
//         cb(null, true); // Accept the file
//     } else {
//         cb(new Error('Only image and video files are allowed!'), false); // Reject the file
//     }
// };

// // Create multer instance with storage and file filter
// export const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
// });

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryInstance } from "../config/cloudinaryConfig.js"; // Correct import

// Configure Cloudinary Storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinaryInstance, // Use the correct variable
    params: async (req, file) => {
        return {
            folder: "courses", // Cloudinary folder to store files
            resource_type: file.mimetype.startsWith("video") ? "video" : "image",
            allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "mp4", "avi", "mov"],
            public_id: `${Date.now()}-${file.originalname.split(" ").join("-")}`, // Unique filename
        };
    },
});

// Define file filter
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "image/jpeg", "image/png", "image/gif", "image/webp",
        "video/mp4", "video/mpeg", "video/ogg", "video/webm"
    ];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error("Invalid file type"));
};

// Set up multer
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});
