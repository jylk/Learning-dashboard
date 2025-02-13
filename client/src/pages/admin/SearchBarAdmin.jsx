import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { FaSearch } from "react-icons/fa";

export const SearchBarAdmin = () => {
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
    navigate(`/admin/course-details/${courseId}`);
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
    <div ref={searchContainerRef} style={{ position: "relative", width: "100%", maxWidth: "1000px", margin: 80 }}>
      <div style={{ position: "sticky", top: 0, zIndex: 10, padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: "1000px" }}>
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
              padding: "6px 40px",
              width: "80%",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "white",
              fontSize: "16px",
              color: "black",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              position: "absolute",
              right: "150px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FaSearch color="#9ca3af" />
          </button>
        </div>
      </div>

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


