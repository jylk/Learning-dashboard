import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const LoginPage = ({ role = "user" }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const user = {
        role: "user",
        login_api: "/user/log-in",
        profile_route: "/user/profile",
        signup_route: "/signup",
    };

    if (role === "mentor") {
        user.role = "mentor";
        user.login_api = "/mentor/log-in";
        user.profile_route = "/mentor/profile";
        user.signup_route = "/mentor/signup";
    }
    if (role === "admin") {
        user.role = "admin";
        user.login_api = "/admins/log-in";
        user.profile_route = "/admin/profile";
    }

    
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(user.login_api, data);
            console.log("API Response:", response.data);

            if (response.data.success) {
                const userData = response.data.user;

                // ✅ Store user details in localStorage
                localStorage.setItem("user", JSON.stringify({
                    id: userData.id,
                    role: user.role,
                    email: userData.email
                }));

                toast.success("Login successful!");
                navigate(user.profile_route);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
            <div className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-md shadow-xl rounded-3xl p-8">
                <h1 className="text-4xl font-bold text-white text-center mb-4">Login now! {role}</h1>
                <p className="text-white text-center mb-6">
                    Welcome to your learning hub! Sign in to explore courses, share knowledge, and track progress. Whether you're here to learn or teach, your journey starts now!
                </p>
                
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-white mb-2">Email</label>
                        <input type="email" {...register("email")} placeholder="Enter your email" 
                               className="w-full p-4 rounded-xl bg-white bg-opacity-40 border-none focus:ring-4 focus:ring-indigo-400 text-gray-900 placeholder-gray-600" required />
                    </div>
                    <div>
                        <label className="block text-white mb-2">Password</label>
                        <input type="password" {...register("password")} placeholder="Enter your password" 
                               className="w-full p-4 rounded-xl bg-white bg-opacity-40 border-none focus:ring-4 focus:ring-indigo-400 text-gray-900 placeholder-gray-600" required />
                        <div className="text-right text-sm mt-1">
                            <Link to={user.signup_route} className="text-indigo-200 hover:text-white">New User? Sign up</Link>
                        </div>
                    </div>
                    <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-xl transition duration-300 flex items-center justify-center text-lg font-semibold shadow-md hover:shadow-lg"
                            disabled={isLoading}>
                        {isLoading ? <span className="loading loading-spinner"></span> : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};
