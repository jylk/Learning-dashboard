import React from "react";
import { CircleUser } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { SearchBarAdmin } from "../../pages/admin/SearchBarAdmin";

export const AdminHeader = () => {
    return (
        <div className="flex justify-between items-center w-full px-20 h-24 shadow-2xl relative">
            {/* Admin Title Link - Adjusted width and positioning */}
            <Link to={"/admin/home"} className="absolute left-20 top-1/2 transform -translate-y-1/2 z-10">
                <div className="text-3xl font-bold">Admin</div>
            </Link>

            <div className="px-10 w-full">
                <SearchBarAdmin />
            </div>

            <nav className="flex gap-16 items-center font-semibold">
                <Link to={"/admin/home"} className="relative z-20">Home</Link>
                <Link to={"/admin/about"}>About</Link>
                <Link to={"/admin/course"}>Course</Link>
                <Link to={"/admin/AdminUsers"}>Users</Link>
                <Link to={"/admin/AdminMentors"}>Mentors</Link>
            </nav>

            <div className="flex gap-14 px-10 items-center">
                <DarkMode />
                <Link to={"/admin/profile"}>
                    <CircleUser />
                </Link>
            </div>
        </div>
    );
};
