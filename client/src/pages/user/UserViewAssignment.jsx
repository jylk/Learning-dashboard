import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

// 🔹 Custom Hook for Fetching Assignments
const useAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const USER = JSON.parse(localStorage.getItem("user")) || {};
    const userid = USER?.id;

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                // Fetch orders for the user
                const response1 = await axiosInstance.get(`/order_Get/get-orders?userid=${userid}`);
                setOrders(response1.data.orders);

                // Fetch all assignments
                const response2 = await axiosInstance.get("/assignment/all");
                console.log("Fetched Assignments:", response2.data);

                // Extract course titles from the orders
                const purchasedCourseTitles = response1.data.orders.flatMap(order =>
                    order.courses.map(course => course.title)
                );

                // Filter assignments based on the purchased course titles
                const filteredAssignments = response2.data.filter(assignment =>
                    purchasedCourseTitles.includes(assignment.title)
                );

                setAssignments(filteredAssignments);
            } catch (error) {
                console.error("Error fetching assignments:", error);
                setError("Failed to load assignments.");
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [userid]);

    return { assignments, loading, error };
};

// 🔹 Custom Hook for Fetching Student's Submissions
const useStudentSubmissions = () => {
    const [submissions, setSubmissions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axiosInstance.get("/assignment/my-submissions");
                console.log("Fetched Submissions:", response.data);

                if (Array.isArray(response.data)) {
                    const submissionMap = {};
                    response.data.forEach((submission) => {
                        if (submission.assignmentId && submission.assignmentId._id) {
                            submissionMap[submission.assignmentId._id] = submission.score ?? "Not Graded";
                        }
                    });
                    setSubmissions(submissionMap);
                } else {
                    setSubmissions({});
                }
            } catch (error) {
                console.error("Error fetching submissions:", error.response?.data || error.message);
                setError(error.response?.data?.message || "Failed to load scores.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    return { submissions, loading, error };
};

// 🔹 Main Component: View Assignments
export const UserViewAssignment = () => {
    const { assignments, loading: assignmentsLoading, error: assignmentsError } = useAssignments();
    const { submissions, loading: submissionsLoading, error: submissionsError } = useStudentSubmissions();
    const navigate = useNavigate();

    if (assignmentsLoading || submissionsLoading) return <p>Loading assignments...</p>;
    if (assignmentsError) return <p style={{ color: "red" }}>{assignmentsError}</p>;
    if (submissionsError) toast.error(submissionsError);

    return (
        <div>
            <h2>Assignments</h2>
            {assignments.length === 0 ? (
                <p>No assignments available</p>
            ) : (
                <ul>
                    {assignments.map((assignment) => {
                        const userScore = submissions[assignment._id]; // Check if user has a score

                        return (
                            <li key={assignment._id} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
                                <h3>{assignment.title}</h3>
                                <p>{assignment.description}</p>
                                <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>

                                {/* Display Score */}
                                <p><strong>Score:</strong> {userScore !== undefined ? userScore : "Not Submitted"}</p>

                                {/* Show Submit Button if Score is Undefined */}
                                {userScore === undefined && (
                                    <button
                                        onClick={() => navigate(`/submit-assignment/${assignment._id}`)}
                                        style={{
                                            padding: "5px 10px",
                                            background: "blue",
                                            color: "white",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Submit Assignment
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>


            )}
        </div>
    );
};
