import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

export const handleImageUpload = async (path, isVideo = false) => {
    try {
        let uploadResult;
        if (isVideo) {
         uploadResult = await cloudinaryInstance.uploader.upload(path, {
            resource_type: "video" // Specify resource type as video
        });
    }
        else{
            uploadResult = await cloudinaryInstance.uploader.upload(path);
        }
        return uploadResult.url;
    } catch (error) {
        next(error);
    }
    
};
