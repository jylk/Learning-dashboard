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
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Signup now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque
                        aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" placeholder="name" {...register("name")} className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" {...register("email")} className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                {...register("password")}
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <Link to={'/login'}>
                                    <a href="#" className="label-text-alt link link-hover">
                                        Existing User?
                                    </a>
                                </Link>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Mobile Number</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter your mobile number"
                                {...register("mobile")}
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile Picture</span>
                            </label>
                            <input
                                type="file"
                                {...register("profilePic")}
                                className="file-input file-input-bordered"
                                accept="image/*"
                            />
                        </div>



                        <div className="form-control mt-6">
                            <button className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};