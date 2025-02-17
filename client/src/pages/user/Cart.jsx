import React, { useEffect, useState } from "react";
import { CartCards } from "../../components/user/Cards";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";

export const Cart = () => {
    const [cartData, setCartData] = useState({ courses: [], totalPrice: 0 }); // Initialize with empty cart
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const USER = JSON.parse(localStorage.getItem("user")) || {};
    const userid = USER?.id;

    // Fetch cart data on component mount
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axiosInstance.get("/cart/get-cart");
                if (response?.data?.data) {
                    setCartData(response.data.data);
                } else {
                    // If no cart data is found, set an empty cart
                    setCartData({ courses: [], totalPrice: 0 });
                }
            } catch (error) {
                if (error.response?.status === 404) {
                    // Handle 404 error (no cart found) gracefully
                    setCartData({ courses: [], totalPrice: 0 });
                } else {
                    setError(error);
                    toast.error("Failed to fetch cart data");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartData();
    }, [cartData]);

    const handleRemoveItem = async (courseId) => {
        try {
            const response = await axiosInstance.delete("/cart/remove-course", {
                data: { userId: userid, courseId },
            });

            setCartData(prevCart => {
                const updatedCourses = prevCart.courses.filter(course => course._id !== courseId);
                const updatedTotalPrice = updatedCourses.reduce((sum, course) => sum + course.price, 0);

                return {
                    ...prevCart,
                    courses: updatedCourses,
                    totalPrice: updatedTotalPrice, 
                };
            });

            toast.success("Product removed from cart");
        } catch (error) {
            console.error("Error removing course:", error);
            toast.error(error?.response?.data?.message || "Error while removing product");
        }
    };

    const makePayment = async () => {
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
    
            const session = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                data: { products: cartData?.courses },
            });
    
            // Ensure correct course IDs are passed to the order creation
            await axiosInstance.post("/order/create-order", {
                courses: cartData?.courses.map(course => ({
                    courseId: course.courseId?._id,  // Ensure the correct course ID is used
                    title: course.courseId?.title,
                    price: course.courseId?.price,
                    image: course.courseId?.image
                })),
                totalAmount: cartData?.totalPrice,
                userid,
            });
    
            await axiosInstance.post("/cart/clear-cart");
            await stripe.redirectToCheckout({ sessionId: session?.data?.sessionId });
            toast.success("Order successfully created!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to create order");
        }
    };
    
        if (isLoading) {
            return <div>Loading...</div>;
        }
    
        if (error) {
            return <div>Error: {error.message}</div>;
        }
    
        // Show no cart message if cartData is empty
        if (!cartData || cartData.courses.length === 0) {
            return <div className="text-center">No items in your cart!</div>;
        }

    return (
        <div className="p-6 flex flex-col items-center bg-gray-50">
            <div className="grid gap-8 w-full max-w-3xl mt-6 bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-100 shadow-xl rounded-lg p-8 text-center transition-transform transform hover:scale-105">
                {cartData?.courses?.map((value) => (
                    <CartCards item={value} key={value._id} handleRemove={() => handleRemoveItem(value._id)} />
                ))}
            </div>

            <div className="mt-8 w-full max-w-md bg-white shadow-xl rounded-lg p-6 text-center border-t-4 border-indigo-500">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Price Summary</h2>
                <h2 className="text-xl font-bold text-gray-700">Total Price: ₹{cartData?.totalPrice}</h2>
                <button
                    onClick={makePayment}
                    className="mt-6 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};