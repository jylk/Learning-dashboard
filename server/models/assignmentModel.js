import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
    title: 
    {
        type: String, 
        required: true 
    },
    mentorId: 
    {
        type: String, 
        required: true 
    },
    description: String,
    dueDate: Date,
    createdBy: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Mentor", 
        required: true 
    },
    submissions: [
        {
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            content: String,
            submittedAt: { type: Date, default: Date.now },
            score: Number,
            feedback: String
        }
    ]
});

export const Assignment = mongoose.model("Assignment", assignmentSchema);
