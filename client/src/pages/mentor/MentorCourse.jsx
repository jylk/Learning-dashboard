import React from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { CourseCard } from "../../components/mentor/Cards";
import { useFetch } from "../../hooks/UseFetch";
import { CoursePageSkelton } from "../../components/shared/Skelton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/userSlice";

export const MentorCourse = () => {
  const [courses, loading] = useFetch("/course/all-courses");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Retrieve mentor details safely from localStorage
  const mentor = JSON.parse(localStorage.getItem("user")) || {};
  const mentorId = mentor?.id;

  // ✅ Filter mentor courses
  const mentorCourses = Array.isArray(courses)
    ? courses.filter(course => course.mentor?._id === mentorId)
    : [];

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/mentor/log-out");
      localStorage.removeItem("mentor");
      dispatch(clearUser());
      navigate("/");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  return loading ? (
    <CoursePageSkelton />
  ) : (
    <div className="container mx-auto px-4 py-8">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-white dark:text-white">Mentor Courses</h1>
        <div className="flex gap-4">
          <Link
            to="/mentor/create-course"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Course
          </Link>

        </div>
      </div>

      {/* Course Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {mentorCourses.length > 0 ? (
          mentorCourses.map((course) => (
            <CourseCard course={course} key={course._id} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
};
