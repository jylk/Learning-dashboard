import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteMentor = () => {
    // const { isUserAuth, userData } = useSelector((state) => state.user);
    // console.log("isuserAuth=====", isUserAuth);
    // // loading

    // const isMentorAUth = true;

    const navigate = useNavigate();

    // useEffect(() => {
    // if (!isUserAuth) {
    //     navigate("/login");
    //     return;
    // }
    // }, []);

    return <Outlet />;
};