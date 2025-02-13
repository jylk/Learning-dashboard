// controllers/lectureController.js
import { Lecture } from "../models/lectureModel.js";
import { Course } from "../models/courseModel.js";
import { cloudinaryInstance } from "../config/cloudinaryConfig.js"; 
import { handleImageUpload } from "../utils/cloudinary.js";// configure your Cloudinary setup here

// Upload video lecture
export const uploadLecture = async (req, res) => {
    try {
        const { title, description, courseId } = req.body;
        console.log("body-------",req.body)

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        let videoUrl;
        
        const filePath = req.file.path; // Assuming multer is used and the file path is obtained
        console.log("filepath----------",filePath)
        const isVideo = req.file.mimetype.startsWith("video/"); // Check if the file is a video

         videoUrl = await handleImageUpload(filePath, isVideo);        

        const lecture = await Lecture.create({ title, description, courseId, createdBy: req.user.id, videoUrl });        

        res.status(201).json({ message: "Lecture uploaded successfully", lecture });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};


// export const uploadLecture = async (req, res) => {
//     try {
//         const { title, description, courseId } = req.body;

//         console.log("Received courseId:", courseId);
//         if (!mongoose.Types.ObjectId.isValid(courseId)) {
//             return res.status(400).json({ message: "Invalid course ID format" });
//         }

//         const course = await Course.findById(new mongoose.Types.ObjectId(courseId));
//         if (!course) {
//             return res.status(404).json({ message: "Course not found" });
//         }

//         let videoUrl;
//         const filePath = req.file?.path; // Ensure file exists
//         console.log("Filepath:", filePath);

//         if (!filePath) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         const isVideo = req.file.mimetype.startsWith("video/");
//         videoUrl = await handleImageUpload(filePath, isVideo);

//         const lecture = await Lecture.create({
//             title,
//             description,
//             courseId,
//             createdBy: req.user.id,
//             videoUrl,
//         });

//         res.status(201).json({ message: "Lecture uploaded successfully", lecture });
//     } catch (error) {
//         console.error("Upload Lecture Error:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };


// Get all lectures for a course
export const getLecturesByCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        
        const lectures = await Lecture.find({ courseId });
        
        if (!lectures.length) {
            return res.status(404).json({ message: "No lectures found for this course" });
        }

        res.status(200).json({ lectures });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
