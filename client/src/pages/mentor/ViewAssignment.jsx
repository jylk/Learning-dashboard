// ViewAssignments Component (Frontend)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

// Custom Hook for Fetching Assignments

    const useAssignments = () => {
        const [assignments, setAssignments] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const mentor = JSON.parse(localStorage.getItem("user")) || {};
        const mentorId = mentor?.id;  // Get logged-in mentor ID

        useEffect(() => {
            const fetchAssignments = async () => {
                try {
                    const response = await axiosInstance.get("/assignment/all");
                    if (Array.isArray(response.data)) {
                        // Filter assignments where mentorId matches logged-in mentor's ID
                        const filteredAssignments = response.data.filter(
                            (assignment) => assignment.mentorId === mentorId
                        );
                        setAssignments(filteredAssignments);
                    } else {
                        setAssignments([]);
                    }
                } catch (error) {
                    console.error("Error fetching assignments:", error);
                    setError("Failed to load assignments.");
                } finally {
                    setLoading(false);
                }
            };

            if (mentorId) {
                fetchAssignments();
            }
        }, [mentorId]);

        return { assignments, loading, error };
    };



    export const ViewAssignment = () => {
        const { assignments, loading, error } = useAssignments();
        const navigate = useNavigate();


        if (loading) return <p>Loading assignments...</p>;
        if (error) return <p style={{ color: "red" }}>{error}</p>;

        return (
            <div>
                <h2>Assignments</h2>
                {assignments.length === 0 ? (
                    <p>No assignments available</p>
                ) : (
                    <ul>
                        {assignments.map((assignment) => (
                            <li key={assignment._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                                <h3>{assignment.title}</h3>
                                <p>{assignment.description}</p>
                                <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>

                                <h4>Submissions:</h4>
                                {assignment.submissions && assignment.submissions.length > 0 ? (
                                    <ul>
                                        {assignment.submissions.map((submission) => (
                                            <li key={submission._id} style={{ marginBottom: "5px", padding: "5px", border: "1px solid #ddd" }}>
                                                <p><strong>Student Name:</strong> {submission.studentId.name}</p>
                                                <p><strong>Student Email:</strong> {submission.studentId.email}</p>
                                                <p><strong>Content:</strong> {submission.content}</p>
                                                <p><strong>Submitted At:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
                                                {submission.feedback && <p><strong>Feedback:</strong> {submission.feedback}</p>}
                                                {submission.score !== undefined && <p><strong>Score:</strong> {submission.score}</p>}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p></p>
                                )}

                                {/* Evaluate Submissions Button */}
                                <button
                                    onClick={() => navigate(`/mentor/evaluate/${assignment._id}`)}
                                    style={{ padding: "5px 10px", background: "blue", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}>
                                    Evaluate Submissions
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };
