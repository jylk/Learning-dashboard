import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

export const AdminMentors = () => {
    const [mentors, setMentors] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function getMentorsAndCourses() {
            try {
                const mentorsResponse = await axiosInstance({
                    method: "GET",
                    url: "/admins/adminallmentros"
                });

                const coursesResponse = await axiosInstance({
                    method: "GET",
                    url: "/admins/adminallCourse",
                });

                setMentors(mentorsResponse.data.response);
                setCourses(coursesResponse.data.response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getMentorsAndCourses();
    }, []);

    // Function to get courses for a specific mentor
    const getMentorCourses = (mentorId) => {
        return courses.filter(course => course.mentor === mentorId);
    };

    // Function to delete a mentor
    const deleteMentor = async (mentorId) => {
        // Confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this mentor?");
        if (!isConfirmed) return;

        try {
            // API call to delete the mentor
            await axiosInstance({
                method: "DELETE",
                url: `/admins/deletementor/${mentorId}`,
            });

            // Remove the deleted mentor from the state
            setMentors(mentors.filter(mentor => mentor._id !== mentorId));
            alert("Mentor deleted successfully!");
        } catch (error) {
            console.error("Error deleting mentor:", error);
            alert("Failed to delete mentor. Please try again.");
        }
    };

    return (
        <div>
            <h1>Admin Mentors</h1>
            {mentors.map(mentor => (
                <div key={mentor._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <h2>{mentor.name}</h2>
                    <p>Email: {mentor.email}</p>
                    <p>Role: {mentor.role}</p>
                    <p>Qualification: {mentor.qualification}</p>
                    <img src={mentor.profilePic} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    <h3>Posted Courses:</h3>
                    {getMentorCourses(mentor._id).length > 0 ? (
                        getMentorCourses(mentor._id).map(course => (
                            <div key={course._id} style={{ marginLeft: '20px' }}>
                                <p>Course Title: {course.title}</p>
                                <p>Description: {course.description}</p>
                                <p>Price: ${course.price}</p>
                                <p>Duration: {course.duration}</p>
                                <img src={course.image} alt="Course" style={{ width: '50px', height: '50px' }} />
                            </div>
                        ))
                    ) : (
                        <p>No Courses Posted</p>
                    )}
                    <button
                        onClick={() => deleteMentor(mentor._id)}
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Remove Mentor
                    </button>
                </div>
            ))}
        </div>
    );
};