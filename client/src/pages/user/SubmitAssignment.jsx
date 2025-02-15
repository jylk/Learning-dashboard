import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

// 🔹 Custom Hook: Fetch assignment details
const useAssignment = (assignmentId) => {
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await axiosInstance.get(`/assignment/${assignmentId}`);
                setAssignment(response.data);
            } catch (error) {
                console.error("Error fetching assignment:", error);
                setError("Failed to load assignment.");
            } finally {
                setLoading(false);
            }
        };

        fetchAssignment();
    }, [assignmentId]);

    return { assignment, loading, error };
};

// 📌 Main Component: Submit Assignment
export const SubmitAssignment = () => {
    const { assignmentId } = useParams();
    const { assignment, loading: assignmentLoading, error } = useAssignment(assignmentId);
    const navigate = useNavigate();
    const [content, setContent] = useState("");

    // ✅ Retrieve user from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}"); 
    const studentId = user?.id; // Extract user ID

    useEffect(() => {
        if (!studentId) {
            toast.error("User not logged in. Redirecting to login...");
            navigate("/login");
        }
    }, [studentId, navigate]);

    const handleSubmit = async () => {
        if (!content.trim()) {
            toast.error("Assignment content cannot be empty!");
            return;
        }

        try {
            await axiosInstance.post("/assignment/submit", {
                assignmentId,
                studentId, // ✅ Use stored user ID
                content,
            });

            toast.success("Assignment submitted successfully!");
            navigate("/assignment");
        } catch (error) {
            console.error("Submission failed:", error);
            toast.error(error.response?.data?.message || "Failed to submit assignment.");
        }
    };

    if (assignmentLoading) return <p>Loading assignment details...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Submit Assignment</h2>
            <h3>{assignment?.title}</h3>
            <p>{assignment?.description}</p>
            <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your response here..."
                style={{ width: "100%", height: "100px", marginTop: "10px", padding: "10px" }}
            />
            <br />
            <button 
                onClick={handleSubmit} 
                style={{ marginTop: "10px", padding: "10px 15px", background: "green", color: "white", border: "none", cursor: "pointer" }}
            >
                Submit Assignment
            </button>
        </div>
    );
};
