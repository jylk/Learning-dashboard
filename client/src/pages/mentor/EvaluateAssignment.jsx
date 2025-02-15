// EvaluateAssignment Component (Frontend)
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

// Custom Hook for Fetching Submissions
// Custom Hook for Fetching Submissions
const useSubmissions = (assignmentId) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axiosInstance.get(`/assignment/submitted/${assignmentId}`);

                if (response.data && response.data.length > 0) {
                    setSubmissions(response.data);
                    setError(null); // Clear error if data is found
                } else {
                    setSubmissions([]); // Empty submissions list
                    setError(null); // No error if no data found
                }
            } catch (error) {
                console.error("Error fetching submissions:", error);
                setError("🚨 No students have submitted the assignment yet.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [assignmentId]);

    return { submissions, loading, error, setSubmissions };
};

export const EvaluateAssignment = () => {
    const { assignmentId } = useParams();
    const navigate = useNavigate();
    const { submissions, loading, error, setSubmissions } = useSubmissions(assignmentId);
    const [scores, setScores] = useState({});
    const [feedbacks, setFeedbacks] = useState({});

    const handleScoreChange = (submissionId, value) => {
        setScores({ ...scores, [submissionId]: value });
    };

    const handleFeedbackChange = (submissionId, value) => {
        setFeedbacks({ ...feedbacks, [submissionId]: value });
    };

    const handleSubmitScore = async (submissionId, studentId) => {
        try {
            const score = scores[submissionId];
            const feedback = feedbacks[submissionId];

            if (score === undefined || feedback === undefined) {
                return toast.error("Please provide both score and feedback!");
            }

            await axiosInstance.put("/assignment/evaluate", {
                assignmentId,
                studentId,
                score,
                feedback,
            });

            toast.success("Score and feedback submitted!");

            // Update local submission state
            setSubmissions((prev) =>
                prev.map((submission) =>
                    submission._id === submissionId ? { ...submission, score, feedback } : submission
                )
            );
        } catch (error) {
            toast.error("Failed to submit score and feedback.");
        }
    };

    if (loading) return <p>Loading submissions...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Evaluate Submissions</h2>
            {submissions.length === 0 ? (
                <p style={{ color: "gray", fontSize: "18px", textAlign: "center", marginTop: "20px" }}>
                    🚨 No students have submitted the assignment yet.
                </p>
            ) : (
                <ul>
                    {submissions.map((submission) => (
                        <li key={submission._id} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
                            <p><strong>Student Name:</strong> {submission.studentId.name}</p>
                            <p><strong>Student Email:</strong> {submission.studentId.email}</p>
                            <p><strong>Content:</strong> {submission.content}</p>
                            <p><strong>Submitted At:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
                            <p><strong>Current Score:</strong> {submission.score ?? "Not graded yet"}</p>

                            {submission.score === undefined || submission.score === null ? (
                                <>
                                    <label>Score:</label>
                                    <input
                                        type="number"
                                        value={scores[submission._id] || ""}
                                        onChange={(e) => handleScoreChange(submission._id, e.target.value)}
                                        style={{ marginLeft: "10px" }}
                                    />

                                    <label>Feedback:</label>
                                    <input
                                        type="text"
                                        value={feedbacks[submission._id] || ""}
                                        onChange={(e) => handleFeedbackChange(submission._id, e.target.value)}
                                        style={{ marginLeft: "10px" }}
                                    />

                                    <button
                                        onClick={() => handleSubmitScore(submission._id, submission.studentId)}
                                        style={{
                                            marginLeft: "10px",
                                            padding: "5px 10px",
                                            background: "green",
                                            color: "white",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Submit Score and Feedback
                                    </button>
                                </>
                            ) : null}
                        </li>
                    ))}
                </ul>

            )}
            <button
                onClick={() => navigate("/mentor/view-Assignment")}
                style={{ marginTop: "20px", padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
                Back to Assignments
            </button>
        </div>
    );
};

