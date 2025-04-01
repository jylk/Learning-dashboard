import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";


export const GetLectures = ({ courseId }) => {
    const [lectures, setLectures] = useState([]);
  
    useEffect(() => {
      axiosInstance
        .get(`/lectures/getLectures/${courseId}`) // ✅ Correct API request
        .then((res) => {
          console.log("Lectures fetched:", res.data);
          setLectures(res.data); // ✅ Store response correctly
        })
        .catch(() => toast.error("Failed to fetch lectures"));
    }, [courseId]);
  
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Modules</h3>
        {lectures.lectures?.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {lectures.lectures.map((mod) => (  // ✅ Correctly accessing `lectures`
              <li key={mod._id} className="bg-gray-800 p-3 rounded-lg">
                <h4 className="text-lg font-medium">{mod.module}</h4>
                <p className="text-gray-300">{mod.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No lectures available.</p>
        )}
      </div>
    );
  };
  