import express from "express";
import { createQuiz, submitQuiz, getQuiz, removeQuiz, addQuestionsToQuiz } from "../controllers/quizController.js";
import { authUser } from "../middlewares/authUser.js";
import { authMentor } from "../middlewares/authMentor.js";

const router = express.Router();

// Quiz Routes
router.post("/create", authMentor, createQuiz);              // Only mentors can create
router.post("/submit", authUser, submitQuiz);             // Only students can submit
router.get("/:quizId", authUser, getQuiz);                // Students get quiz to attempt
router.delete("/remove", authMentor, removeQuiz);        // Only mentors can remove
router.put("/add-questions", authMentor, addQuestionsToQuiz);  // Endpoint for adding questions

export { router as quizRouter };