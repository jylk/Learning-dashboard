// import { v2 as cloudinary } from 'cloudinary';

// // Configuration
// cloudinary.config({
//     cloud_name: 'dqgrcovgg',
//     api_key: '861227773913621',
//     api_secret:'B5z59Gb_2stcoRUgMVl99RU6xWA', // Click 'View Credentials' below to copy your API secret
// });

// export const cloudinaryInstance = cloudinary

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,
});

export const cloudinaryInstance = cloudinary