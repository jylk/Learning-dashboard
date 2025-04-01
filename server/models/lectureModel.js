import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
    {
    module: 
    { 
        type: String, 
        required: true 
    },
    description: String,   
    
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
