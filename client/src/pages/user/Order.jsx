import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const USER = JSON.parse(localStorage.getItem("user")) || {};
  const userid = USER?.id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/order_Get/get-orders?userid=${userid}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error?.response?.data?.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userid]);

  if (loading) return <p className="text-center text-lg">Loading Orders...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-500 dark:text-gray-200">Your Orders</h1>
      {orders.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div key={order._id} className="flex flex-col bg-base-200 dark:bg-gray-800 shadow-lg rounded-lg p-6 gap-6 hover:shadow-xl transition-all w-full">
              <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-200">Order ID: {order._id}</h2>
              <p className="text-gray-500 dark:text-gray-200">Total Price: <strong>₹{order.totalAmount}</strong></p>
              <p className="text-gray-500 dark:text-gray-200">Payment Status:
                <span className={`ml-2 font-semibold ${order.paymentStatus === "Paid" ? "text-green-600" : "text-red-500"}`}>
                  {order.paymentStatus}
                </span>
              </p>
              <div>
                <h3 className="text-gray-500 dark:text-gray-200 font-semibold">Courses in Order:</h3>
                <ul className="list-none mt-3">
                  {order.courses.map((course, index) => (
                    <li key={index} className="flex items-center bg-base-200 dark:bg-gray-700 shadow-lg rounded-lg p-4 gap-4 hover:shadow-xl transition-all w-full">
                      {course.image && (
                        <img src={course.image} alt="Course" className="w-24 h-20 rounded-lg object-cover" />
                      )}
                      <div className="flex flex-col flex-grow">
                        <p className="text-gray-500 dark:text-gray-200 font-medium">{course.title || "No Title"}</p>
                        <p className="text-gray-500 dark:text-gray-200">₹{course.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">No orders found.</p>
      )}
    </div>
  );
};
