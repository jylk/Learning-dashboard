import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const CourseDetails = () => {
  

    const { id } = useParams();
    const [courseDetails,isLoading]=useFetch(`/course/courseDetails/${id}`)

    const handleAddToCart = async()=>{
      try {
        const response = await axiosInstance({
          method:"POST",
          url:"/cart/add-to-cart",
          data: {courseId:id}
        })
        toast.success('product added to cart')
      } catch (error) {
        console.log(error); 
        toast.error(error?.response?.data?.message ||  'error adding product to cart') 
      }
    }


    return (
        <div className="flex ">
            <div className="w-4/12">
              <img src={courseDetails?.image} alt="course-image" />
            </div>
            <div className="w-10/12">
              <h2 className="text-3xl">{courseDetails?.title}</h2>
              <p>{courseDetails?.description}</p>
              <button className="btn btn-success" onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    );
};



// export const CourseDetails = () => {
//   const { id } = useParams();

//   // Fetch course details
//   const [courseDetails, isLoading] = useFetch(`/course/courseDetails/${id}`);

//   // Fetch lectures
//   const [lectures, setLectures] = useState([]);
//   const [loadingLectures, setLoadingLectures] = useState(true);

//   useEffect(() => {
//     const fetchLectures = async () => {
//       try {
//         const response = await axiosInstance.post("/lectures/getLectures", { courseId: id });
//         setLectures(response.data.lectures);
//       } catch (error) {
//         console.error("Error fetching lectures:", error);
//       } finally {
//         setLoadingLectures(false);
//       }
//     };

//     fetchLectures();
//   }, [id]);

//   const handleAddToCart = async () => {
//     try {
//       await axiosInstance.post("/cart/add-to-cart", { courseId: id });
//       toast.success("Product added to cart");
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.message || "Error adding product to cart");
//     }
//   };

//   return (
//     <div className="flex flex-col space-y-6">
//       {/* Course Details */}
//       <div className="flex">
//         <div className="w-4/12">
//           <img src={courseDetails?.image} alt="course-image" className="w-full" />
//         </div>
//         <div className="w-10/12">
//           <h2 className="text-3xl">{courseDetails?.title}</h2>
//           <p>{courseDetails?.description}</p>
//           <button className="btn btn-success mt-4" onClick={handleAddToCart}>Add to cart</button>
//         </div>
//       </div>

//       {/* Lectures Section */}
//       <div>
//         <h3 className="text-2xl font-semibold">Lectures</h3>
//         {loadingLectures ? (
//           <p>Loading lectures...</p>
//         ) : lectures.length > 0 ? (
//           <ul className="list-disc pl-5">
//             {lectures.map((lecture) => (
//               <li key={lecture._id} className="mt-2">
//                 <strong>{lecture.title}</strong> - {lecture.description} 
//                 <br />
//       {lecture.videoUrl && (
//         <video width="400" controls>
//           <source src={lecture.videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No lectures available for this course.</p>
//         )}
//       </div>
//     </div>
//   );
// };
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { axiosInstance } from "../../config/axiosInstance";
// import toast from "react-hot-toast";


// export const CourseDetails = () => {
//   const { id } = useParams();
//   const [courseDetails, setCourseDetails] = useState(null);
//   const [lectures, setLectures] = useState([]);
//   const [loadingLectures, setLoadingLectures] = useState(true);
//   const [selectedTopics, setSelectedTopics] = useState({
//     "Module 1": ["Topic A", "Topic B"],
//     "Module 2": [],
//     "Module 3": []
//   });

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         const response = await axiosInstance.get(`/course/courseDetails/${id}`);
//         setCourseDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching course details:", error);
//       }
//     };

//     const fetchLectures = async () => {
//       try {
//         const response = await axiosInstance.post("/lectures/getLectures", { courseId: id });
//         setLectures(response.data.lectures);
//       } catch (error) {
//         console.error("Error fetching lectures:", error);
//       } finally {
//         setLoadingLectures(false);
//       }
//     };

//     fetchCourseDetails();
//     fetchLectures();
//   }, [id]);

//   const handleAddToCart = async () => {
//     try {
//       await axiosInstance.post("/cart/add-to-cart", { courseId: id });
//       toast.success("Product added to cart");
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.message || "Error adding product to cart");
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-4 p-4">
//       {/* Right Side - Video */}
//       <div className="w-full md:w-1/3 flex flex-col items-center">
//         {lectures.length > 0 && lectures[0].videoUrl ? (
//           <video controls className="w-full rounded-lg shadow-md mb-4">
//             <source src={lectures[0].videoUrl} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         ) : (
//           <p>No video available</p>
//         )}
//         {courseDetails?.image && (
//           <img src={courseDetails.image} alt="Course" className="w-full rounded-lg mt-4" />
//         )}
//       </div>

//       {/* Left Side - Course Details & Modules */}
//       <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow-md">
//         <h2 className="text-xl font-bold">Course Modules</h2>
//         <div>
//           {Object.keys(selectedTopics).map((module) => (
//             <div key={module} className="mt-2">
//               <button className="w-full bg-blue-500 text-white py-2 px-4 rounded">
//                 {module}
//               </button>
//               <div className="p-2 border rounded bg-gray-100">
//                 {selectedTopics[module].map((topic, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <input type="checkbox" checked readOnly />
//                     <span>{topic}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6">
//           <h2 className="text-2xl font-bold text-blue-600 mt-2">{courseDetails?.title || "Python Course"}</h2>
//           <p className="text-gray-600">{courseDetails?.description || "Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games, and apps!"}</p>
//           <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded" onClick={handleAddToCart}>Add to cart</button>
//           <h3 className="text-lg font-semibold mt-4">Lectures</h3>
//           {loadingLectures ? (
//             <p>Loading lectures...</p>
//           ) : lectures.length > 0 ? (
//             <ul className="list-disc pl-5">
//               {lectures.map((lecture) => (
//                 <li key={lecture._id} className="mt-2">
//                   <strong>{lecture.title}</strong> - {lecture.description}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No lectures available for this course.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


