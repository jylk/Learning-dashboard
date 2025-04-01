// 

// controllers/lectureController.js
import { Lecture } from "../models/lectureModel.js";
import { Course } from "../models/courseModel.js";


// Upload video lecture
export const uploadLecture = async (req, res) => {
    try {
        const { module, description, courseId } = req.body;
        console.log("body-------", req.body)

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const lecture = await Lecture.create({ module, description, courseId, createdBy: req.user.id });

        res.status(201).json({ message: "Module created sucessfully", lecture });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};


// Get all lectures for a course


export const getLecturesByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;  // ✅ Extracting from params instead of body

        console.log(`Fetching lectures for courseId: ${courseId}`);

        const lectures = await Lecture.find({ courseId });

        res.status(200).json({ lectures });  // ✅ Always return an array
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all coursedetails for a course
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
