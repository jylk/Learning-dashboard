import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getUsersAndOrders() {
      try {
        const usersResponse = await axiosInstance.get("/admins/allusers");
        const ordersResponse = await axiosInstance.get("/admins/adminallorders");

        setUsers(usersResponse.data.response);
        setOrders(ordersResponse.data.response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getUsersAndOrders();
  }, []);

  // Function to get orders for a specific user
  const getUserOrders = (userId) => {
    return orders.filter((order) => order.userId === userId);
  };

  // Function to delete user with confirmation
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    
    if (!confirmDelete) return; // Stop if user cancels
    
    try {
      await axiosInstance.delete(`/admins/deleteuser/${userId}`);
      setUsers(users.filter((user) => user._id !== userId)); // Remove user from UI
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div>
      <h1>Admin Users</h1>
      {users.map((user) => (
        <div
          key={user._id}
          style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}
        >
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Mobile: {user.mobile}</p>
          <img
            src={user.profilePic}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <h3>Orders:</h3>
          {getUserOrders(user._id).length > 0 ? (
            getUserOrders(user._id).map((order) => (
              <div key={order._id} style={{ marginLeft: "20px" }}>
                <p>Order ID: {order._id}</p>
                <p>Total Amount: ${order.totalAmount}</p>
                <p>Payment Status: {order.paymentStatus}</p>
                <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
                <h4>Courses:</h4>
                {order.courses.map((course) => (
                  <div key={course.courseId} style={{ marginLeft: "20px" }}>
                    <p>Course Title: {course.title}</p>
                    <p>Course Price: ${course.price}</p>
                    <img src={course.image} alt="Course" style={{ width: "50px", height: "50px" }} />
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No Order</p>
          )}
          {/* Delete button */}
          <button
            onClick={() => handleDeleteUser(user._id)}
            style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer", marginTop: "10px" }}
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
};
