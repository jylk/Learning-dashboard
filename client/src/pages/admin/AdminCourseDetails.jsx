import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const AdminCourseDetails = () => {
  const { id } = useParams();
  const [courseDetails] = useFetch(`/course/courseDetails/${id}`);
  const [lectures, setLectures] = useState([]);
  const [loadingLectures, setLoadingLectures] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axiosInstance.post("/lectures/getLectures", {
          courseId: id,
        });
        setLectures(response.data.lectures);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingLectures(false);
      }
    };

    fetchLectures();
  }, [id]);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-900 text-white p-6">
      {/* Left Side - Thumbnail inside Video Frame */}
      <div className="w-full md:w-1/2 p-4">
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={courseDetails?.image}
            alt="Course Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Side - Course Details */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold">{courseDetails?.title}</h2>
        <p className="mt-2 text-gray-300 break-words mr-4">
          {courseDetails?.description}
        </p>

        {/* Lesson Dropdowns - Manually Designed */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Lessons</h3>

          {/* Lesson 1 */}
          <details className="mt-2 bg-gray-800 p-3 rounded-lg">
            <summary className="cursor-pointer font-medium">
              Lesson 1: Introduction
            </summary>
            <ul className="mt-2 space-y-1 text-gray-300 pl-4">
              <li className="text-sm flex items-center">
                <input type="checkbox" className="mr-2" />
                Topic 1: Overview
              </li>
              <li className="text-sm flex items-center">
                <input type="checkbox" className="mr-2" />
                Topic 2: Basics
              </li>
            </ul>
          </details>

          {/* Lesson 2 */}
          <details className="mt-2 bg-gray-800 p-3 rounded-lg">
            <summary className="cursor-pointer font-medium">
              Lesson 2: Advanced Concepts
            </summary>
            <ul className="mt-2 space-y-1 text-gray-300 pl-4">
              <li className="text-sm flex items-center">
                <input type="checkbox" className="mr-2" />
                Topic 1: Deep Dive
              </li>
              <li className="text-sm flex items-center">
                <input type="checkbox" className="mr-2" />
                Topic 2: Practical Examples
              </li>
            </ul>
          </details>

          {/* Lesson 3 */}
          <details className="mt-2 bg-gray-800 p-3 rounded-lg">
            <summary className="cursor-pointer font-medium">
              Lesson 3: Final Steps
            </summary>
            <ul className="mt-2 space-y-1 text-gray-300 pl-4">
              <li className="text-sm flex items-center">
                <input type="checkbox" className="mr-2" />
                Topic 1: Summary
              </li>
              <li className="text-sm flex items-center">
                <input type="checkbox" className="mr-2" />
                Topic 2: Next Steps
              </li>
            </ul>
          </details>
        </div>
    
      </div>
    </div>
  );
};
