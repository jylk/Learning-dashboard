import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { FiEdit2, FiLogOut } from "react-icons/fi"; // Icons for buttons

export const Profile = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance.get("/user/profile");
            setUser(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                mobile: user.mobile || "",
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
            setError("New passwords do not match");
            return;
        }
        setError("");

        try {
            const response = await axiosInstance.put("/user/profile-update", {
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });

            if (response?.data?.user) {
                setIsEditing(false);
                fetchUserProfile(); // Re-fetch updated profile including profile picture
            }
        } catch (error) {
            console.log(error);
            setError(error.response?.data || "Error updating profile");
        }
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/user/log-out");
            dispatch(clearUser());
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center relative border border-gray-100 transform transition-transform hover:scale-105">
                {/* Profile Image with Edit Icon */}
                <div className="relative mx-auto w-32 h-32">
                    <img
                        src={user?.profilePic ? `${user.profilePic}?t=${Date.now()}` : "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <button
                        className="absolute bottom-1 right-1 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
                        onClick={() => setIsEditing(true)}
                    >
                        <FiEdit2 size={16} />
                    </button>
                </div>

                {isEditing ? (
                    <div className="mt-6 space-y-4 text-left">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Email"
                        />
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Mobile Number"
                        />
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Current Password"
                        />
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter New Password"
                        />
                        <input
                            type="password"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm New Password"
                        />

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-1/2 mr-2"
                                onClick={handleUpdate}
                            >
                                Save Changes
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition w-1/2 ml-2"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mt-4 text-gray-800">{user?.name}</h1>
                        <p className="text-gray-600 text-lg mt-2">{user?.email}</p>
                        <p className="text-gray-500 text-md mt-2">📞 {user?.mobile}</p>
                        <p className="text-gray-500 text-sm mt-2">
                            🗓 Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                        </p>

                        <div className="flex justify-between mt-6">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-1/2 mr-2 flex items-center justify-center"
                                onClick={() => setIsEditing(true)}
                            >
                                <FiEdit2 className="mr-2" />
                                Edit Profile
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-1/2 ml-2 flex items-center justify-center"
                                onClick={handleLogout}
                            >
                                <FiLogOut className="mr-2" />
                                Logout
                            </button>
                        </div>
                    </>
                )}

                <Link
                    to="/assignment"
                    className="block text-blue-500 hover:text-blue-700 mt-4 font-medium"
                >
                    📄 View Assignment
                </Link>
            </div>
        </div>
    );
};