// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useFetch } from "../../hooks/UseFetch";
// import { axiosInstance } from "../../config/axiosInstance";
// import toast from "react-hot-toast";



// export const MentorCourseDetails = () => {
//   const { id } = useParams();

//   // Fetch course details
//   const [courseDetails, isLoading] = useFetch(`/course/courseDetails/${id}`);

//   // Fetch lectures
//   const [lectures, setLectures] = useState([]);
//   const [loadingLectures, setLoadingLectures] = useState(true);


//   return (
//     <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-900 text-white p-6">
//       {/* Left Side - Thumbnail inside Video Frame */}
//       <div className="w-full md:w-1/2 p-4">
//         <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
//         <video controls className="w-full h-full object-cover">
//             <source src={courseDetails?.video} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       </div>

//       {/* Right Side - Course Details */}
//       <div className="w-full md:w-1/2 p-4">
//         <h2 className="text-3xl font-bold">{courseDetails?.title}</h2>
//         <p className="mt-2 text-gray-300 break-words mr-4">
//           {courseDetails?.description}
//         </p>


//         {/* Lesson Dropdowns - Manually Designed */}
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold">Lessons</h3>

//           {/* Lesson 1 */}
//           <details className="mt-2 bg-gray-800 p-3 rounded-lg">
//             <summary className="cursor-pointer font-medium">
//               Lesson 1: Introduction
//             </summary>
//             <ul className="mt-2 space-y-1 text-gray-300 pl-4">
//               <li className="text-sm flex items-center">
//                 <input type="checkbox" className="mr-2" />
//                 Topic 1: Overview
//               </li>
//               <li className="text-sm flex items-center">
//                 <input type="checkbox" className="mr-2" />
//                 Topic 2: Basics
//               </li>
//             </ul>
//           </details>

//           {/* Lesson 2 */}
//           <details className="mt-2 bg-gray-800 p-3 rounded-lg">
//             <summary className="cursor-pointer font-medium">
//               Lesson 2: Advanced Concepts
//             </summary>
//             <ul className="mt-2 space-y-1 text-gray-300 pl-4">
//               <li className="text-sm flex items-center">
//                 <input type="checkbox" className="mr-2" />
//                 Topic 1: Deep Dive
//               </li>
//               <li className="text-sm flex items-center">
//                 <input type="checkbox" className="mr-2" />
//                 Topic 2: Practical Examples
//               </li>
//             </ul>
//           </details>

//           {/* Lesson 3 */}
//           <details className="mt-2 bg-gray-800 p-3 rounded-lg">
//             <summary className="cursor-pointer font-medium">
//               Lesson 3: Final Steps
//             </summary>
//             <ul className="mt-2 space-y-1 text-gray-300 pl-4">
//               <li className="text-sm flex items-center">
//                 <input type="checkbox" className="mr-2" />
//                 Topic 1: Summary
//               </li>
//               <li className="text-sm flex items-center">
//                 <input type="checkbox" className="mr-2" />
//                 Topic 2: Next Steps
//               </li>
//             </ul>
//           </details>
//         </div>

//       </div>
//     </div>
//   );
// };



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { GetLectures } from "./GetLectures";

export const MentorCourseDetails = () => {
  const { id } = useParams();
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [modules, setModules] = useState("");

  // Fetch course details
  const [courseDetails, isLoading] = useFetch(`/course/courseDetails/${id}`);



  // Handle adding a module
  const handleAddModule = async () => {
    if (!moduleTitle || !moduleDescription) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await axiosInstance.post(
        "/lectures/add-lectures",
        { module: moduleTitle, description: moduleDescription, courseId: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      toast.success("Module added successfully");
      setModuleTitle("");
      setModuleDescription("");



    } catch (error) {
      toast.error("Failed to add module");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-900 text-white p-6">
      {/* Left Side - Video Section */}
      <div className="w-full md:w-1/2 p-4">
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
          {courseDetails?.video ? (
            <video controls className="w-full h-full object-cover">
              <source src={courseDetails.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="text-gray-400">No video available</p>
          )}
        </div>
      </div>

      {/* Right Side - Course Details & Modules */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold">{courseDetails?.title || "Course Title"}</h2>
        <p className="mt-2 text-gray-300">{courseDetails?.description || "No description available."}</p>

        {/* Add Module Form */}
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Add New Module</h3>
          <input
            type="text"
            placeholder="Module Title"
            className="w-full p-2 mt-2 bg-gray-700 rounded-md text-white"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
          <textarea
            placeholder="Module Description"
            className="w-full p-2 mt-2 bg-gray-700 rounded-md text-white"
            value={moduleDescription}
            onChange={(e) => setModuleDescription(e.target.value)}
          />
          <button
            className="mt-3 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={handleAddModule}
          >
            Add Module
          </button>
        </div>

        {/* List of Modules */}

        <GetLectures courseId={id} />
      </div>
    </div>
  );
};





