import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Trash2 } from "lucide-react";

export const AdminMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getMentorsAndCourses() {
      try {
        const mentorsResponse = await axiosInstance.get("/admins/adminallmentros");
        const coursesResponse = await axiosInstance.get("/admins/adminallCourse");
        
        setMentors(mentorsResponse.data.response);
        setCourses(coursesResponse.data.response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getMentorsAndCourses();
  }, []);

  const getMentorCourses = (mentorId) => {
    return courses.filter((course) => course.mentor === mentorId);
  };

  const deleteMentor = async (mentorId) => {
    if (!window.confirm("Are you sure you want to delete this mentor?")) return;
    
    try {
      await axiosInstance.delete(`/admins/deletementor/${mentorId}`);
      setMentors(mentors.filter((mentor) => mentor._id !== mentorId));
      alert("Mentor deleted successfully!");
    } catch (error) {
      console.error("Error deleting mentor:", error);
      alert("Failed to delete mentor. Please try again.");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Mentors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div
            key={mentor._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <img
                src={mentor.profilePic}
                alt="Profile"
                className="w-16 h-16 rounded-full border border-gray-300"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{mentor.name}</h2>
                <p className="text-sm text-gray-600">📧 {mentor.email}</p>
                <p className="text-sm text-gray-600">🎓 {mentor.qualification}</p>
              </div>
            </div>

            {/* Courses Section */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700">Posted Courses:</h3>
              {getMentorCourses(mentor._id).length > 0 ? (
                <div className="bg-gray-50 p-3 rounded-lg mt-2 border">
                  {getMentorCourses(mentor._id).map((course) => (
                    <div key={course._id} className="mb-2 border-b pb-2">
                      <p className="text-sm text-gray-700">📖 {course.title}</p>
                      <p className="text-sm text-gray-700">💰 Price: ${course.price}</p>
                      <p className="text-xs text-gray-500">⌛ {course.duration} hours</p>
                      <img
                        src={course.image}
                        alt="Course"
                        className="w-10 h-10 rounded-lg border mt-2"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600 mt-2">No Courses Posted</p>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteMentor(mentor._id)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <Trash2 size={18} /> Remove Mentor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
