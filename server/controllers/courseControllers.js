import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Course } from "../models/courseModel.js";
import { handleImageUpload } from "../utils/cloudinary.js";

export const findAllCourses = async (req, res, next) => {
    try {
        const courseList = await Course.find().populate("mentor", "_id name");

        res.json({ message: "course list fetched", data: courseList });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};

export const fetchCourseDetails = async (req, res, next) => {
    try {
        const { courseId } = req.params;        

        const courseDetails = await Course.findOne({ _id: courseId });
        
        res.json({ message: "course details fetched", data: courseDetails });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};

//


// export const createCourse = async (req, res, next) => {
//     try {
//         let imageUrl;

//         const { title, description, duration, price } = req.body;

//         if (!title || !description || !duration || !price) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         const isCourseExist = await Course.findOne({ title });

//         if (isCourseExist) {
//             return res.status(400).json({ message: "Course already exists" });
//         }

//         console.log("image====", req.file);

//         if (req.file) {
//             const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
//             imageUrl = cloudinaryRes.url;
//         }

//         console.log(imageUrl, '====imageUrl');

//         // Ensure the user is a mentor
//         if (!req.user || !req.user._id) {
//             return res.status(403).json({ message: "Unauthorized: Only mentors can create courses" });
//         }

//         const mentorId = req.user._id; // Automatically get mentor ID

//         const newCourse = new Course({ title, description, duration, price, image: imageUrl, mentor: mentorId });
//         await newCourse.save();

//         res.json({ message: "Course created successfully", data: newCourse });
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json(error.message || "Internal server error");
//     }
// };

export const createCourse = async (req, res) => {
    try {
        console.log("Received files:", req.files); // Debugging logs

        if (!req.files || (!req.files.image && !req.files.video)) {
            return res.status(400).json({ message: "Image or video file is required!" });
        }

        const { title, description, duration, price } = req.body;
        if (!title || !description || !duration || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isCourseExist = await Course.findOne({ title });
        if (isCourseExist) {
            return res.status(400).json({ message: "Course already exists" });
        }

        // Extract Cloudinary URLs from uploaded files
        let imageUrl = req.files.image ? req.files.image[0].path : null;
        let videoUrl = req.files.video ? req.files.video[0].path : null;

        if (!req.user || !req.user._id) {
            return res.status(403).json({ message: "Unauthorized: Only mentors can create courses" });
        }

        const newCourse = new Course({
            title,
            description,
            duration,
            price,
            image: imageUrl,
            video: videoUrl,
            mentor: req.user._id
        });

        await newCourse.save();
        res.json({ message: "Course created successfully", data: newCourse });

    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const updateCourse = async (req, res, next) => {
    try {
        const { courseId, title, description, duration, price, image } = req.body;

        let imageUrl;

        const isCourseExist = await Course.findById(courseId);
        if (!isCourseExist) {
            return res.status(404).json({ message: "course not found" })
        }

        console.log("image====", req.file);

        if (req.file) {
            const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
            imageUrl = cloudinaryRes.url;
            // imageUrl = await handleImageUpload(req.file.path)
        }

        console.log(imageUrl, '====imageUrl');

        const courseUpdated = await Course.findByIdAndUpdate(courseId, { title, description, duration, price, image: imageUrl }, { new: true });

        res.json({ message: "course updated successfully", data: courseUpdated });
        console.log("Updated course---------", courseUpdated)
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};

export const deleteCourse = async (req, res, next) => {
    try {

        const { courseId } = req.body;

        const courseDetails = await Course.findByIdAndDelete(courseId);       

        if (!courseDetails) {
            return res.status(404).json({ message: "course not found" });
        }

        res.json({ message: "course deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};

