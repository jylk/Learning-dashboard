import multer, { diskStorage } from "multer";

const storage = diskStorage({
    filename: function (req, file, cb) {
        console.log('file===',file);
        
        cb(null, file.originalname);
    },
});

// Define file filter to accept image and video file types
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        // Image MIME types
        'image/jpeg',    // JPEG
        'image/png',     // PNG
        'image/gif',     // GIF
        'image/webp',    // WebP
        'image/bmp',     // BMP
        'image/svg+xml', // SVG

        // Video MIME types
        'video/mp4',     // MP4
        'video/mpeg',    // MPEG
        'video/ogg',     // OGG
        'video/webm',    // WebM
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only image and video files are allowed!'), false); // Reject the file
    }
};

// Create multer instance with storage and file filter
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
