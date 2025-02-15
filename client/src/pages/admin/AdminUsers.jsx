import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Trash2 } from "lucide-react";

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
    if (!confirmDelete) return;

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
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-16 h-16 rounded-full border border-gray-300"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">📞 {user.mobile}</p>
              </div>
            </div>

            {/* Orders Section */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700">Orders:</h3>
              {getUserOrders(user._id).length > 0 ? (
                <div className="bg-gray-50 p-3 rounded-lg mt-2 border">
                  {getUserOrders(user._id).map((order) => (
                    <div key={order._id} className="mb-2 border-b pb-2">
                      <p className="text-sm text-gray-700">🆔 Order ID: {order._id}</p>
                      <p className="text-sm text-gray-700">💰 Amount: ${order.totalAmount}</p>
                      <p className="text-sm text-gray-700">✔️ Status: {order.paymentStatus}</p>
                      <p className="text-xs text-gray-500">📅 {new Date(order.createdAt).toLocaleString()}</p>

                      {/* Courses */}
                      <h4 className="font-medium text-gray-700 mt-2">Courses:</h4>
                      {order.courses.map((course) => (
                        <div key={course.courseId} className="flex items-center space-x-3 mt-1">
                          <img
                            src={course.image}
                            alt="Course"
                            className="w-10 h-10 rounded-lg border"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{course.title}</p>
                            <p className="text-xs text-gray-600">${course.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600 mt-2">No Orders</p>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <Trash2 size={18} /> Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
