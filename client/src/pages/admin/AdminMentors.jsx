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
  
      <table className="min-w-full bg-white shadow-lg border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm text-gray-700">Mentor Image</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700">Mentor Email</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700">Courses</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700">Delete Mentor</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => (
            <tr key={mentor._id} className="border-b hover:bg-gray-50">
              {/* Mentor Image */}
              <td className="px-4 py-2">
                <img
                  src={mentor.profilePic}
                  alt="Mentor Profile"
                  className="w-16 h-16 rounded-full border border-gray-300"
                />
              </td>
  
              {/* Mentor Email */}
              <td className="px-4 py-2 text-sm text-gray-600">
                {mentor.email}
              </td>
  
              {/* List of Courses */}
              <td className="px-4 py-2 text-sm text-gray-600">
                {getMentorCourses(mentor._id).length > 0 ? (
                  getMentorCourses(mentor._id).map((course, index) => (
                    <p key={index} className="text-sm">{course.title}</p>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No Courses Posted</p>
                )}
              </td>
  
              {/* Delete Mentor Button */}
              <td className="px-4 py-2 text-sm">
                <button
                  onClick={() => deleteMentor(mentor._id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                  Remove Mentor
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
