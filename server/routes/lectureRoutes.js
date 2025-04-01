// routes/lectureRoutes.js
import express from "express";
import { uploadLecture, getLecturesByCourse, fetchCourseDetails } from "../controllers/lectureController.js";
import { authMentor } from "../middlewares/authMentor.js"; // only mentors can upload lectures


const router = express.Router();

// Route to upload a lecture
router.post("/add-lectures", authMentor, uploadLecture);

// Route to get all lectures for a course
router.get("/getLectures/:courseId", getLecturesByCourse);

//Route to get all details for a course
router.get("/courseDetails/:courseId", fetchCourseDetails);

export { router as lectureRouter };
