import React, { useEffect } from 'react'
import { Header } from '../components/admin/Header'
import { Footer } from '../components/admin/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AdminHeader } from '../components/admin/AdminHeader'
import { axiosInstance } from '../config/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, saveUser } from '../redux/features/userSlice'

export const AdminLayout = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
        const { userAutherized } = useSelector((state) => state.user);

    const checkUser = async () => {
        try {
            const response = await axiosInstance({ method: "GET", url: "/admins/check-admin" });
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
       {userAutherized ? <AdminHeader /> : <Header />}

        
        <div className='min-h-96'>
            <Outlet/>
        </div>
        <Footer />
    </div>
  )
}
