import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: 'dqgrcovgg',
    api_key: '861227773913621',
    api_secret:'B5z59Gb_2stcoRUgMVl99RU6xWA', // Click 'View Credentials' below to copy your API secret
});

export const cloudinaryInstance = cloudinary