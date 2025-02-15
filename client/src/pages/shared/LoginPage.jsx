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
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now! {role} </h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
                        In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password")}
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <Link to={user.signup_route}>New User?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
