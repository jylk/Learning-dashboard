import { createBrowserRouter} from "react-router-dom";
import { UserLayout } from "../layout/UserLayout";
import { ErrorPage } from "../pages/user/ErrorPage";
import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";
import { Course } from "../pages/user/Course";
import { CourseDetails } from "../pages/user/CourseDetails";
import { Home } from "../pages/user/Home";
import { LoginPage } from "../pages/shared/LoginPage";
import { ProtectRoute } from "./ProtectRoute";
import { Profile } from "../pages/user/Profile";
import { Cart } from "../pages/user/Cart";
import { SignupPage } from "../pages/shared/SignupPage";
import { MentorLayout } from "../layout/MentorLayout";
import { MentorProfile } from "../pages/mentor/MentorProfile";
import { MentorAbout } from "../pages/mentor/MentorAbout";
import { MentorContact } from "../pages/mentor/MentorContact";
import { MentorHome } from "../pages/mentor/MentorHome";
import { ProtectedRouteMentor } from "./ProtectedRouteMentor";
import { CreateCourse } from "../pages/mentor/CreateCourse";
import { MentorCourse } from "../pages/mentor/MentorCourse";
import { AdminLayout } from "../layout/AdminLayout";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import { AdminHome } from "../pages/admin/AdminHome";
import { AdminAbout } from "../pages/admin/AdminAbout";
import { AdminCourse } from "../pages/admin/AdminCourse";
import { AdminContact } from "../pages/admin/AdminContact";
import { AdminCreateCourse } from "../pages/admin/AdminCreateCourse";
import { MentorCourseDetails } from "../pages/mentor/MentorCourseDetails";
import { AdminCourseDetails} from "../pages/admin/AdminCourseDetails";
import { CreateAssignment } from "../pages/mentor/CreateAssignment";
import { ViewAssignment } from "../pages/mentor/ViewAssignment";
import { UserViewAssignment } from "../pages/user/UserViewAssignment";
import { SubmitAssignment } from "../pages/user/SubmitAssignment";
import { EvaluateAssignment } from "../pages/mentor/EvaluateAssignment";
import { Orders } from "../pages/user/Order";
import{AdminUsers} from '../pages/admin/AdminUsers'
import { AdminMentors } from "../pages/admin/AdminMentors";


 export const router = createBrowserRouter([
    {
      path: "",
      element: <UserLayout />,
      errorElement: <ErrorPage/>,
      children: [
        { 
          path: "signup",
          element: <SignupPage />
        },
        { 
          path: "login",
          element: <LoginPage />,

        },
        { 
            path: "",
            element: <Home />,

        },
        { 
            path: "about",
            element: <About />,

        },
        { 
            path: "contact",
            element: <Contact />,

        },
        { 
            path: "course",
            element: <Course />,

        },
        { 
            path: "course-details/:id",
            element: <CourseDetails />,

        },
        { 
          path: "assignment",
          element: <UserViewAssignment />,

      },
      { 
        path: "submit-assignment/:assignmentId",
        element: <SubmitAssignment />,

    },
    {
      path: 'orders',
      element: <Orders/>
    },
        
       {
            path:'user',
            element: <ProtectRoute />,
            children: [
              {
                path: "profile",
                element: <Profile/>,
              },
              {
                path: 'cart',
                element: <Cart />
              },
              {
                path: 'wishlist',
                element: <h2>User Wishlist</h2>
              },
             
              {
                path:"payment/success",
                element: <Orders/>
              },
              {
                path:"payment/cancel",
                element: <h2>Payment cancelled</h2>
              },
              
              
              
        ]
       }
       
      ],
    },
    {
      path: "mentor",
      element: <MentorLayout />,
      errorElement: <ErrorPage role="mentor" />,  
      children: [
          {
              path: "signup",
              element: <SignupPage role="mentor"/>,
          },
          {
              path: "login",
              element: <LoginPage role="mentor" />,
          },
          
          
          { 
            path: "",
            element: <ProtectedRouteMentor />,
            children: [
              {
                  path: "dashboard",
              },
              {
                  path: "all-courses",
              },
              {
                  path: "/mentor/profile",
                  element: <MentorProfile/>
              },
              {
                  path: "/mentor/create-course",
                  element: <CreateCourse />,
              },
              { 
                path: "/mentor/course-details/:id",
                element: <MentorCourseDetails />,
    
            },
              { 
                path: "/mentor/home",
                element: <MentorHome />,
    
            },
            { 
                path: "/mentor/about",
                element: <MentorAbout />,
    
            },
            { 
                path: "/mentor/contact",
                element: <MentorContact />,
    
            },
            { 
                path: "/mentor/course",
                element: <MentorCourse />,
    
            },
            { 
              path: "/mentor/create-Assignment",
              element: <CreateAssignment />,
  
          },
          { 
            path: "/mentor/view-Assignment",
            element: <ViewAssignment/>,

        },
        { path:"/mentor/evaluate/:assignmentId" ,
          element :<EvaluateAssignment />}

       
          ],
      },
  ],
},
{
  path: "admin",
  element: <AdminLayout />,
  errorElement: <ErrorPage role="admin" />,  
  children: [
      {
          path: "signup",
          element: <SignupPage role="admin"/>,
      },
      {
          path: "login",
          element: <LoginPage role="admin" />,
      },
      
      
      { 
        path: "",
        element: <ProtectedRouteAdmin />,
        children: [
         
          {
              path: "/admin/profile",
              element: <AdminProfile/>
          },
         
          { 
            path: "/admin/home",
            element: <AdminHome />,

        },
        { 
            path: "/admin/about",
            element: <AdminAbout />,

        },
        { 
            path: "/admin/contact",
            element: <AdminContact />,

        },
        { 
            path: "/admin/course",
            element: <AdminCourse />,

        },
        { 
          path: "/admin/course-details/:id",
          element: <AdminCourseDetails />,

      },
      {
        path:'/admin/AdminUsers',
        element:<AdminUsers/>
      },
      {
        path:'/admin/AdminMentors',
        element:<AdminMentors/>
      }
      ],
  },
],
},
// {
//   path: "admin",
//  element: <AdminLayout />,
//   errorElement: <ErrorPage role="admin" />,
//   children: [
//       {
//           path: "login",
//           element: <LoginPage role="admin" />,
//       },
//       {
//         path: "/admin/profile",
//         element: <AdminProfile/>
//     },
     
//   ],
// },
]);


            
            
          // { 
          //   path: "about",
          //   element: <MentorAbout />,

          // },
          // { 
          //   path: "contact",
          //   element: <MentorContact />,

          // },
          // { 
          //   path: "course",
          //   element: <Course />,

          // },
          // { 
          //   path: "course-details/:id",
          //   element: <CourseDetails />,

          // },

          // {
          // //     path: "",
          // //     element: <ProtectRoute />,
          // //     children: [
          // //         {
          // //             path: "profile",
          // //             element: <MentorProfile />
          // //         },
                  
          // //     ],
          //  },
      
  

