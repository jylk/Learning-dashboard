import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";

export const CreateAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courses, loading] = useFetch("/course/all-courses");

  const mentor = JSON.parse(localStorage.getItem("user")) || {};
  const mentorId = mentor?.id;

  const mentorCourses = Array.isArray(courses)
    ? courses.filter(course => course.mentor?._id === mentorId)
    : [];

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/assignment/create", {
        title,
        description,
        dueDate,
        mentorId,
        courseId: selectedCourseId
      }, { withCredentials: true });
      alert(response.data.message);
    } catch (error) {
      console.error("Error creating assignment:", error.response?.data);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto bg-base-100 shadow-md rounded-md my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Assignment</h2>
      <form onSubmit={handleCreateAssignment} className="space-y-6">

        {/* Course Dropdown */}
        <div>
          <label htmlFor="courseSelect" className="block text-sm font-medium">Select a Course:</label>
          <select
            id="courseSelect"
            value={selectedCourseId}
            onChange={(e) => {
              const selectedId = e.target.value;
              setSelectedCourseId(selectedId);

              // Find the selected course and update the title
              const selectedCourse = mentorCourses.find(course => course._id === selectedId);
              if (selectedCourse) {
                setTitle(selectedCourse.title);
              } else {
                setTitle("");
              }
            }}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select a course</option>
            {mentorCourses.map(course => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>

        </div>


        {/* Description Text Area */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Assignment Description:</label>
          <textarea
            id="description"
            placeholder="Write assignment details here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Due Date Input */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition">
          Create Assignment
        </button>
      </form>

      <Link className="block mt-4 text-center text-blue-500 hover:underline" to={'/mentor/view-Assignment'}>
        View Assignments
      </Link>
    </div>
  );
};