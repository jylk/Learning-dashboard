import React from "react";
import { useFetch } from "../../hooks/UseFetch";
import { CourseCard } from "../../components/admin/Cards";
import { CoursePageSkelton } from "../../components/shared/Skelton";
import { Link } from "react-router-dom";

export const AdminCourse = () => {
  const [courses, loading] = useFetch("/course/all-courses");

  return loading ? (
    <CoursePageSkelton />
  ) : (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Admin Courses
      </h1>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard course={course} key={course._id} />
        ))}



      </div>
    </div>
  );
};
