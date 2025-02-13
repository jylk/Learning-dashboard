// routes/lectureRoutes.js
import express from "express";
import { uploadLecture, getLecturesByCourse } from "../controllers/lectureController.js";
import { authMentor } from "../middlewares/authMentor.js"; // only mentors can upload lectures
import { upload } from "../middlewares/multer.js";

const router = express.Router();

// Route to upload a lecture
router.post("/add-lectures", authMentor, upload.single('video'), uploadLecture);

// Route to get all lectures for a course
router.post("/getLectures", getLecturesByCourse);

export { router as lectureRouter };
