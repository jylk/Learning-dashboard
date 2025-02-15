import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { FiEdit2, FiLogOut } from "react-icons/fi";

export const AdminProfile = () => {
    const [admin, setAdmin] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch Admin Profile
    const fetchAdminProfile = async () => {
        try {
            const response = await axiosInstance.get("/admins/profile");
            const userData = response.data.userData;

            if (userData) {
                setAdmin(userData);
                setFormData({
                    name: userData.name || "",
                    email: userData.email || ""
                });
            }
        } catch (error) {
            console.log("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Profile Update
    const handleUpdate = async () => {
        setError("");

        if (!formData.email) {
            setError("Admin email is required.");
            return;
        }

        try {
            await axiosInstance.put("/admins/adminUpdate", {
                email: formData.email,
                name: formData.name.trim()
            });

            setIsEditing(false);
            fetchAdminProfile();
        } catch (error) {
            setError(error.response?.data?.message || "Error updating profile");
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        try {
            await axiosInstance.post("/admins/log-out", {}, { withCredentials: true });
            dispatch(clearUser());
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                {/* Profile Picture */}
                <div className="relative mx-auto w-32 h-32">
                    <img
                        src={admin?.profilePic || "https://via.placeholder.com/150"}
                        alt="Admin Profile"
                        className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg object-cover"
                    />
                </div>

                {isEditing ? (
                    <div className="mt-6 space-y-4 text-left">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter Name"
                        />
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-gray-200 cursor-not-allowed"
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="flex justify-between mt-4">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-1/2 mr-2" onClick={handleUpdate}>Save</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg w-1/2 ml-2" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mt-4">{admin?.name}</h1>
                        <p className="text-gray-600 text-lg mt-2">{admin?.email}</p>
                        <p className="text-gray-500 text-sm mt-2">🗓 Joined: {admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "N/A"}</p>
                        <div className="flex justify-between mt-6">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-1/2 mr-2 flex items-center justify-center" onClick={() => setIsEditing(true)}>
                                <FiEdit2 className="mr-2" /> Edit Profile
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-1/2 ml-2 flex items-center justify-center" onClick={handleLogout}>
                                <FiLogOut className="mr-2" /> Logout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
