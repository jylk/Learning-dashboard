import React from "react";
import { CircleUser } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";    
import { DarkMode } from "../shared/DarkMode";
import {SearchBarMentor} from "../../pages/mentor/SearchBarMentor";

export const MentorHeader = () => {
    return (
        <div className="flex justify-between items-center w-full px-20  h-24 shadow-2xl  ">
            <Link to={"/mentor/home"}>
                <div className="text-3xl font-bold">Mentor</div>
            </Link>
            <div className="px-10 w-full"> <SearchBarMentor /></div>
            <nav className="flex gap-16 items-center font-semibold">
                <Link to={"/mentor/home"}>Home</Link>
                <Link to={"/mentor/about"}>About</Link>
                <Link to={"/mentor/course"}>Course</Link>
            </nav>

            <div className="flex gap-14 items-center ">
                <DarkMode />
                
                <Link to={"/mentor/profile"}>
                    <CircleUser />
                </Link>
            </div>
        </div>
    );
};