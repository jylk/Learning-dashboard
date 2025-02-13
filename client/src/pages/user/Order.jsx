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

  if (loading) return <p>Loading Orders...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Your Orders</h1>
      {orders.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-300 p-4 bg-white rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-blue-600">Order ID: {order._id}</h2>
              <p className="mt-2 text-gray-600">Total Price: <strong>₹{order.totalAmount}</strong></p>
              <p className="text-gray-600">Payment Status: <span className="text-green-600">{order.paymentStatus}</span></p>
              <div className="mt-4">
                <h3 className="text-gray-800 font-semibold">Courses in Order:</h3>
                <ul className="list-disc ml-5 mt-2">
                  {order.courses.map((course) => (
                    <li key={course.courseId} className="text-gray-700">
                      {course.title} - ₹{course.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
    </div>
  );
};
