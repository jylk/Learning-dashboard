import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
    {
    title: 
    { 
        type: String, 
        required: true 
    },
    description: String,
    videoUrl: 
    { 
        type: String, 
        required: true 
    },
    courseId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course", 
        required: true 
    },
    createdBy: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Mentor", 
        required: true 
    },
    createdAt: { type: Date, default: Date.now }
});

export const Lecture = mongoose.model("Lecture", lectureSchema);
