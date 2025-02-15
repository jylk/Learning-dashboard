import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { CourseCard } from "../../components/user/Cards";
import { useFetch } from "../../hooks/UseFetch";
import { CoursePageSkelton } from "../../components/shared/Skelton";

// export const Course = () => {
//     const [courses, loadingCourses, errorCourses] = useFetch("/course/all-courses");
//     const [lectures, loadingLectures, errorLectures] = useFetch("/lectures/getLectures");

//     return loadingCourses || loadingLectures ? (
//         <CoursePageSkelton />
//     ) : (
//         <div>
//             <div className="grid gap-y-20 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
//                 {courses.map((course) => (
//                     <CourseCard 
//                         course={course} 
//                         key={course._id} 
//                         lectures={lectures.filter(lecture => lecture.courseId === course._id)} // Matching lectures to courses
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };
export const Course = () => {
    const [courses, loading,error] = useFetch("/course/all-courses");

    {
        return loading ? (
            <CoursePageSkelton />
        ) : (
            <div>
                <div className="grid gap-y-20 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
                    {courses.map((value) => (
                        <CourseCard course={value} key={value._id} />
                    ))}
                </div>
            </div>
        );
    }
};
