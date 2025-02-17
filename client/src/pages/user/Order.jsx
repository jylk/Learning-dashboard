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
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-100">Your Orders</h1>
      {orders.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div key={order._id} className="flex flex-col bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 gap-6 hover:shadow-2xl transition-all transform hover:scale-105 w-full">
              <p className="text-gray-600 dark:text-gray-300">
                Payment Status:
                <span className={`ml-2 font-semibold ${order.paymentStatus === "Paid" ? "text-green-500" : "text-red-500"}`}>
                  {order.paymentStatus}
                </span>
              </p>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Courses in Order:</h3>
                <ul className="list-none mt-4 space-y-4">
                  {order.courses.map((course, index) => (
                    <li key={index} className="flex items-center bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4 gap-4 hover:shadow-lg transition-all w-full">
                      {course.image && (
                        <img src={course.image} alt="Course" className="w-20 h-20 rounded-lg object-cover shadow-md" />
                      )}
                      <div className="flex flex-col flex-grow">
                        <p className="text-gray-700 dark:text-gray-200 font-medium text-sm">{course.title || "No Title"}</p>
                        <p className="text-gray-500 dark:text-gray-300 text-sm">₹{course.price}</p>
                        <Link to={`/course-details/${course?._id}`}>
                          <button className="btn btn-primary px-2 py-0 text-sm font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 transition-all">
                              More Detail 
                          </button>
                      </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No orders found.</p>
      )}
    </div>
  );
};
