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
    }, []);

    const handleRemoveItem = async (courseId) => {
        try {
            const response = await axiosInstance.delete("/cart/remove-course", {
                data: { userId: userid, courseId },
            });

            // Update cart data state with the updated cart
            setCartData(response.data.data);
            toast.success("Item removed from cart!");
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

            await axiosInstance.post("/order/create-order", {
                courses: cartData?.courses.map(course => ({
                    courseId: course._id,
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
        <div className="p-4">
            <div className="grid gap-4">
                {cartData?.courses?.map((value) => (
                    <CartCards
                        item={value}
                        key={value._id}
                        handleRemove={() => handleRemoveItem(value._id)}
                    />
                ))}
            </div>

            <div className="w-6/12 bg-base-300 flex flex-col items-center gap-5">
                <h2>Price summary:</h2>
                <h2>Total Price: {cartData?.totalPrice}</h2>
                <button onClick={makePayment} className="btn btn-success">Checkout</button>
            </div>
        </div>
    );
};