
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/userSlice";
import { FiEdit2, FiLogOut, FiCamera } from "react-icons/fi";

export const MentorProfile = () => {
    const [mentor, setMentor] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        profilePic: "",
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchMentorProfile();
    }, []);

    useEffect(() => {
        if (mentor) {
            setFormData({
                name: mentor.name || "",
                email: mentor.email || "",
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
                profilePic: mentor.profilePic || "",
            });
        }
    }, [mentor]);

    const fetchMentorProfile = async () => {
        try {
            const response = await axiosInstance.get("/mentor/profile");
            console.log(response.data.userData);

            setMentor(response.data.userData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilePic: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async () => {
        if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
            setError("New passwords do not match");
            return;
        }
        setError("");

        try {
            const response = await axiosInstance.put("/mentor/profile-update", {
                name: formData.name,
                email: formData.email,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                profilePic: formData.profilePic,
            });

            if (response?.data?.mentor) {
                setIsEditing(false);
                fetchMentorProfile();
            }
        } catch (error) {
            console.log(error);
            setError(error.response?.data || "Error updating profile");
        }
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/mentor/log-out");
            dispatch(clearUser());
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center relative border border-gray-200">
                <div className="relative mx-auto w-32 h-32">
                    <img
                        src={formData.profilePic || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                    />
                    {isEditing && (
                        <label className="absolute bottom-1 right-1 bg-gray-700 text-white p-2 rounded-full shadow-md cursor-pointer">
                            <FiCamera size={16} />
                            <input type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    )}
                </div>

                {isEditing ? (
                    <div className="mt-6 space-y-4 text-left">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Name" />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Email" />
                        <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Current Password" />
                        <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="New Password" />
                        <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Confirm New Password" />

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex justify-between mt-4">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-1/2" onClick={handleUpdate}>Save</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg w-1/2" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mt-4 text-gray-800">{mentor?.name}</h1>
                        <p className="text-gray-600 text-lg mt-2">{mentor?.email}</p>
                        <p className="text-gray-500 text-sm mt-2">Joined: {mentor?.createdAt ? new Date(mentor.createdAt).toLocaleDateString() : "N/A"}</p>
                        <div className="flex justify-between mt-6">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-1/2 flex items-center justify-center" onClick={() => setIsEditing(true)}>
                                <FiEdit2 className="mr-2" /> Edit
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-1/2 flex items-center justify-center" onClick={handleLogout}>
                                <FiLogOut className="mr-2" /> Logout
                            </button>
                        </div>
                        <Link className="link link-hover" to={'/mentor/create-Assignment'}>Create Assignments</Link>
                    </>
                )}
                    
            </div>
            
        </div>
    );
};
