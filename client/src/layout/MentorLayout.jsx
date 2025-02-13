import React, { useEffect } from 'react'
import { Header } from '../components/mentor/Header'
import { Footer } from '../components/mentor/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MentorHeader } from '../components/mentor/MentorHeader'
import { axiosInstance } from '../config/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, saveUser } from '../redux/features/userSlice'

export const MentorLayout = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
        const { userAutherized } = useSelector((state) => state.user);

    const checkUser = async () => {
        try {
            const response = await axiosInstance({ method: "GET", url: "/mentor/check-mentor" });
            console.log(response, "====response");
            dispatch(saveUser(response?.data?.data));
        } catch (error) {
            console.log(error?.response?.data, "===error");
            dispatch(clearUser());
        }
    };

    useEffect(() => {
        checkUser();
    }, [location.pathname]);

  return (
    <div>
       {userAutherized ? <MentorHeader /> : <Header />}

        
        <div className='min-h-96'>
            <Outlet/>
        </div>
        <Footer />
    </div>
  )
}