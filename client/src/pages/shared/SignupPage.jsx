import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

export const SignupPage = ({ role = 'user' }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const user = {
        role: "user",
        login_api: "/login",
        profile_route: "/user/profile",
        signup_route: "/user/sign-up",
    };

    if (role === "mentor") {
        user.role = "mentor";
        user.login_api = "/mentor/login";
        user.profile_route = "/mentor/profile";
        user.signup_route = "/mentor/sign-up";
    }

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("mobile", data.mobile);
            if (data.profilePic[0]) {
                formData.append("profilePic", data.profilePic[0]);
            }

            const response = await axiosInstance.post(user.signup_route, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("response====", response);
            navigate(user.login_api);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <div className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-md shadow-xl rounded-3xl p-8">
                <h1 className="text-4xl font-bold text-white text-center mb-4">Sign Up</h1>
                <p className="text-white text-center mb-6">
                    Join our learning community! Sign up to explore courses, share your expertise, and make an impact.
                </p>
                
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-white mb-2">Username</label>
                        <input type="text" placeholder="Enter your name" {...register("name")} 
                               className="w-full p-4 rounded-xl bg-white bg-opacity-40 border-none focus:ring-4 focus:ring-blue-400 text-gray-900 placeholder-gray-600" required />
                    </div>
                    <div>
                        <label className="block text-white mb-2">Email</label>
                        <input type="email" placeholder="Enter your email" {...register("email")} 
                               className="w-full p-4 rounded-xl bg-white bg-opacity-40 border-none focus:ring-4 focus:ring-blue-400 text-gray-900 placeholder-gray-600" required />
                    </div>
                    <div>
                        <label className="block text-white mb-2">Password</label>
                        <input type="password" placeholder="Create a password" {...register("password")} 
                               className="w-full p-4 rounded-xl bg-white bg-opacity-40 border-none focus:ring-4 focus:ring-blue-400 text-gray-900 placeholder-gray-600" required />
                        <div className="text-right text-sm mt-1">
                            <Link to="/login" className="text-blue-200 hover:text-white">Existing User? Log in</Link>
                        </div>
                    </div>
                    <div>
                        <label className="block text-white mb-2">Mobile Number</label>
                        <input type="tel" placeholder="Enter your mobile number" {...register("mobile")} 
                               className="w-full p-4 rounded-xl bg-white bg-opacity-40 border-none focus:ring-4 focus:ring-blue-400 text-gray-900 placeholder-gray-600" required />
                    </div>
                    <div>
                        <label className="block text-white mb-2">Profile Picture</label>
                        <input type="file" {...register("profilePic")} 
                               className="w-full file:bg-blue-500 file:text-white file:rounded-lg file:px-4 file:py-3 file:border-none cursor-pointer hover:file:bg-blue-600" 
                               accept="image/*" />
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl transition duration-300 flex items-center justify-center text-lg font-semibold shadow-md hover:shadow-lg"
                            disabled={isLoading}>
                        {isLoading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};