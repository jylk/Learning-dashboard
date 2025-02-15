import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { FaSearch } from "react-icons/fa";

export const SearchBarMentor = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/search/search-course",
        params: { query },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/mentor/course-details/${courseId}`);
    setResults([]);
  };

  // Hide search results when clicking outside the search area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setResults([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchContainerRef} style={{ position: "relative", width: "100%", maxWidth: "600px", margin: "80px auto" }}>
      {/* Search Field */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value.trim()) {
              setResults([]);
            }
          }}
          placeholder="Search courses..."
          style={{
            padding: "10px 40px 10px 15px", // Left padding for text, right space for icon
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "20px",
            backgroundColor: "white",
            fontSize: "16px",
            color: "black",
            outline: "none",
          }}
        />
        {/* Search Icon */}
        <button
          onClick={handleSearch}
          style={{
            position: "absolute",
            right: "15px", // Adjusted so it stays inside
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaSearch color="#9ca3af" size={16} />
        </button>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#27272a",
            border: "1px solid #4b5563",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 9,
            maxHeight: "300px",
            overflowY: "auto",
            marginTop: "5px",
            borderRadius: "4px",
            color: "black",
          }}
        >
          {results.map((course) => (
            <div
              key={course._id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #4b5563",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2
                onClick={() => handleCourseClick(course._id)}
                style={{
                  cursor: "pointer",
                  color: "white",
                  textDecoration: "underline",
                  marginRight: "10px",
                }}
              >
                {course.title}
              </h2>
              <button
                onClick={() => handleCourseClick(course._id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
