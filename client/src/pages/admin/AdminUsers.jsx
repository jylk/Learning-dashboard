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

      <table className="min-w-full bg-white shadow-lg border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm text-gray-700">User Image</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700">User Email</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700">Courses</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700">Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              {/* User Image */}
              <td className="px-4 py-2">
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border border-gray-300"
                />
              </td>

              {/* User Email */}
              <td className="px-4 py-2 text-sm text-gray-600">
                {user.email}
              </td>

              {/* List of Courses */}
              <td className="px-4 py-2 text-sm text-gray-600">
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700">Orders:</h3>
                  {getUserOrders(user._id).length > 0 ? (
                    <div className="bg-gray-50 p-3 rounded-lg mt-2 border">
                      {getUserOrders(user._id).map((order) => (
                        <div key={order._id} className="mb-2 border-b pb-2">


                          {/* Courses */}
                          <h4 className="font-medium text-gray-700 mt-2">Courses:</h4>
                          {order.courses.map((course) => (
                            <div key={course.courseId} className="flex items-center space-x-3 mt-1">
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
              </td>

              {/* Delete Button */}
              <td className="px-4 py-2 text-sm">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
