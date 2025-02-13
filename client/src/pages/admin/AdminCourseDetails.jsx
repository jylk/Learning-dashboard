import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

// export const MentorCourseDetails = () => {
  

//     const { id } = useParams();
//     const [courseDetails,isLoading]=useFetch(`/course/courseDetails/${id}`)

//     const handleAddToCart = async()=>{
//       try {
//         const response = await axiosInstance({
//           method:"POST",
//           url:"/cart/add-to-cart",
//           data: {courseId:id}
//         })
//         toast.success('product added to cart')
//       } catch (error) {
//         console.log(error); 
//         toast.error(error?.response?.data?.message ||  'error adding product to cart') 
//       }
//     }


//     return (
//         <div className="flex ">
//             <div className="w-4/12">
//               <img src={courseDetails?.image} alt="course-image" />
//             </div>
//             <div className="w-10/12">
//               <h2 className="text-3xl">{courseDetails?.title}</h2>
//               <p>{courseDetails?.description}</p>
//               <button className="btn btn-success" onClick={handleAddToCart}>Add to cart</button>
//             </div>
//         </div>
//     );
// };



export const AdminCourseDetails = () => {
  const { id } = useParams();

  // Fetch course details
  const [courseDetails, isLoading] = useFetch(`/course/courseDetails/${id}`);

  // Fetch lectures
  const [lectures, setLectures] = useState([]);
  const [loadingLectures, setLoadingLectures] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axiosInstance.post("/lectures/getLectures", { courseId: id });
        setLectures(response.data.lectures);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      } finally {
        setLoadingLectures(false);
      }
    };

    fetchLectures();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axiosInstance.post("/cart/add-to-cart", { courseId: id });
      toast.success("Product added to cart");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error adding product to cart");
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Course Details */}
      <div className="flex">
        <div className="w-4/12">
          <img src={courseDetails?.image} alt="course-image" className="w-full" />
        </div>
        <div className="w-10/12">
          <h2 className="text-3xl">{courseDetails?.title}</h2>
          <p>{courseDetails?.description}</p>
        </div>
      </div>

      {/* Lectures Section */}
      <div>
        <h3 className="text-2xl font-semibold">Lectures</h3>
        {loadingLectures ? (
          <p>Loading lectures...</p>
        ) : lectures.length > 0 ? (
          <ul className="list-disc pl-5">
            {lectures.map((lecture) => (
              <li key={lecture._id} className="mt-2">
                <strong>{lecture.title}</strong> - {lecture.description} 
                <br />
      {lecture.videoUrl && (
        <video width="400" controls>
          <source src={lecture.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No lectures available for this course.</p>
        )}
      </div>
    </div>
  );
};
