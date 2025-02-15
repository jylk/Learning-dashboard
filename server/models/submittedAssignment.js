import mongoose from "mongoose";

const SubmittedAssignmentSchema = new mongoose.Schema({
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    score: { type: Number, default: null }, // Score given by mentor
    feedback: { type: String, default: "" }, // Mentor feedback
    submittedAt: { type: Date, default: Date.now }
});


export const SubmittedAssignment = mongoose.model("SubmittedAssignment", SubmittedAssignmentSchema);