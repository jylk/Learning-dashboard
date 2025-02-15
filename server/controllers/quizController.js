import { Quiz } from "../models/quizModel.js";

// Create Quiz
export const createQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body;

        // Check if a quiz with the same title already exists
        const existingQuiz = await Quiz.findOne({ title });
        if (existingQuiz) {
            return res.status(409).json({ message: " Quiz already exists" });
        }

        // If no existing quiz, create a new one       
        const quiz = await Quiz.create({
            title,
            questions,
            createdBy: req.user.id
        });
        res.status(201).json({ message: "Quiz created", quiz });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Submit Quiz
export const submitQuiz = async (req, res) => {
    try {
        const { quizId, answers } = req.body;
        
        const quiz = await Quiz.findById(quizId);

        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });

        quiz.attempts.push({
            studentId: req.user.id,
            answers,
            score
        });
        await quiz.save();

        res.status(200).json({ message: "Quiz submitted", score });
        console.log("Score-------------", score)
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get Quiz for Attempt
export const getQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const quiz = await Quiz.findById(quizId);

        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        res.status(200).json({ quiz });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//Remove quiz
export const removeQuiz = async (req, res) => {
    try {
        const { quizId } = req.body;  // Retrieve quizId from the request body

        if (!quizId) {
            return res.status(400).json({ message: "Quiz ID is required" });
        }

        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

        if (!deletedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.status(200).json({ message: "Quiz removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Add extra questions to an existing quiz
export const addQuestionsToQuiz = async (req, res) => {
    try {
        const { quizId, newQuestions } = req.body;

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // Add new questions to the existing questions array
        quiz.questions.push(...newQuestions);
        await quiz.save();

        res.status(200).json({ message: "Questions added successfully", quiz });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
