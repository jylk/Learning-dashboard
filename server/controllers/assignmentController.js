import { Assignment } from "../models/assignmentModel.js";
import { SubmittedAssignment } from "../models/submittedAssignment.js";
import mongoose from "mongoose";


// ✅ Create Assignment
export const createAssignment = async (req, res) => {
    try {
        const { title, description, dueDate,mentorId } = req.body;
        console.log("from createAssignment",title, description, dueDate,mentorId);
        

        const assignment = new Assignment({
            title,
            description,
            dueDate,
            mentorId,
            createdBy: req.user.id
        });

        await assignment.save();
        res.status(201).json({ message: "Assignment created", assignment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Submit Assignment




export const submitAssignment = async (req, res) => {
    try {
        const { assignmentId, content, studentId } = req.body; // ✅ Extract studentId

        if (!content.trim()) {
            return res.status(400).json({ message: "Assignment is not finished!" });
        }

        // Check if assignment exists
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        // Check if the student has already submitted
        const existingSubmission = await SubmittedAssignment.findOne({ 
            assignmentId, 
            studentId
        });

        if (existingSubmission) {
            return res.status(409).json({ message: "You have already submitted this assignment" });
        }

        // Create a new submission in SubmittedAssignment collection
        const submission = await SubmittedAssignment.create({
            assignmentId,
            studentId, // ✅ Use studentId from request body
            content,
            submittedAt: new Date()
        });

        res.status(201).json({ message: "Assignment submitted successfully", submission });

    } catch (error) {
        console.error("Error submitting assignment:", error);
        res.status(500).json({ message: "Server error", error });
    }
};




// ✅ Get Assignment by ID (Before Submission)
export const getAssignmentById = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const assignment = await Assignment.findById(assignmentId);

        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get All Assignments (Without Submissions)
export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({}, "-submissions"); // Exclude submissions

        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get Submitted Assignments for Evaluation (For Mentors)

export const getSubmittedAssignments = async (req, res) => {
    try {
        const submissions = await SubmittedAssignment.find({ assignmentId: req.params.assignmentId })
            .populate("assignmentId", "title")  // Populate with assignment title
            .populate("studentId", "name email"); // Populate with student info

        if (!submissions.length) {
            return res.status(404).json({ message: "No submitted assignments found" });
        }

        res.status(200).json(submissions);
    } catch (error) {
        console.error("Error fetching submitted assignments:", error);
        res.status(500).json({ message: "Server error", error });
    }
};



// ✅ Evaluate Assignment (Mentor Grading)
export const evaluateAssignment = async (req, res) => {
    try {
        const { assignmentId, studentId, score, feedback } = req.body;

        const submission = await SubmittedAssignment.findOne({ assignmentId, studentId });
        if (!submission) return res.status(404).json({ message: "Submission not found" });

        submission.score = score;
        submission.feedback = feedback;
        await submission.save();

        res.status(200).json({ message: "Assignment evaluated successfully", submission });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// ✅ Get Evaluated Assignments for a Student


export const getMyAssignments = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.status(400).json({ message: "Invalid student ID" });
        }

        const studentId = req.user.id;
        const assignments = await SubmittedAssignment.find({ studentId })
            .populate("assignmentId", "title")
            .select("assignmentId score"); // Include the score field

        res.status(200).json(assignments);
    } catch (error) {
        console.error("Error fetching submitted assignments:", error);
        res.status(500).json({ message: "Server error", error });
    }
};



// ✅ Remove Assignment (Admin Only)
export const removeAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.body;

        if (!assignmentId) {
            return res.status(400).json({ message: "Assignment ID is required" });
        }

        await Assignment.findByIdAndDelete(assignmentId);
        await SubmittedAssignment.deleteMany({ assignmentId }); // Remove related submissions

        res.status(200).json({ message: "Assignment removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
