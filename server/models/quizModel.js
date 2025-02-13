import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
    questionText: 
    { 
        type: String, 
        required: true 
    },
    options: [String],
    correctAnswer: 
    { 
        type: String, 
        required: true
     }
});

const quizSchema = new mongoose.Schema(
    {
    title: 
    { 
        type: String, 
        required: true
     },

    questions: [questionSchema],
    createdBy:
     { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Mentor", 
        required: true 
    },
    attempts: [
        {
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            answers: [String],
            score: Number
        }
    ]
});

export const Quiz = mongoose.model("Quiz", quizSchema);

