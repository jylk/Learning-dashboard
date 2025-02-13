import React from "react";
import { Link } from "react-router-dom";
import { Testimonials } from "../../pages/user/Testimonials";


export const AdminHome = ({ course }) => {

  return (


    <div >

      <div className="bg-cyan-50 min-h-96 flex p-10 "> {/* Outer container with cyan background */}
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="bg-yellow-300 p-10 shadow-lg   items-center w-2/3 space-x-10"> {/* Inner container with yellow background */}
              <div className="max-w-lg text-center m-16 p-5  border-black">
                <h1 className="text-4xl font-bold mb-8 font-serif text-black">We’ll get you to your goals</h1>
                <p className="text-lg font-serif text-black">Go from beginner to advanced in the topic of your choice. Courses from ₹549 through tomorrow.</p>
              </div>
            </div>
            <div className='w-1/3 h-full bg-slate-50'>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpkf9efzHYe8WAxXtdw8fUg6nAen8BTptXfg&s"
                alt="Person"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" className="btn btn-circle">❮</a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>
        
          <div
            id="slide2"
            className="carousel-item relative w-full  bg-cover bg-center"
            style={{ backgroundImage: "url('https://res.cloudinary.com/df2vobhg0/image/upload/v1731613243/Udemy_itqak8.jpg')" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div> {/* Optional dark overlay on image */}
            <div className="absolute top-1/4 left-60   bg-white p-12 rounded-md shadow-lg max-w-sm">
              <h2 className="text-gray-900 font-serif font-bold text-3xl">Skills that drive you forward</h2>
              <p className="text-gray-700 font-serif mt-2">Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.</p>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle">❮</a>
              <a href="#slide3" className="btn btn-circle">❯</a>
            </div>


          </div>


        </div>


      </div>

      <div className='items-center bg-white justify-between gap-50 flex min-h-96'>
        {/* Container uses flex with wrapping and centered alignment */}
        <div className="flex flex-wrap justify-between items-center gap-6 p-10 bg-gray-100">
          {/* Web Development Course Card */}
          <div className="card card-compact  bg-white w-72 shadow-xl">
            <figure className="h-40 overflow-hidden">
              <img
                className="h-full w-full  object-cover"
                src="https://res.cloudinary.com/df2vobhg0/image/upload/v1731436804/pymzcxrfj5uyfe37nzoe.png"
                alt="Web Development Course"
              />
            </figure>
            <div className="card-body h-64">
              <h2 className="card-title font-bold text-black">Web Development Course!</h2>
              <p className="text-slate-900">
                Are you interested in learning Web Development? Enroll in this free course for a dynamic introduction to the profession!
              </p>
              <p className="text-sm text-black font-bold">₹2499</p>
              <p className="text-base font-black text-red-950">Duration: 6 months</p>
              <div className="card-actions justify-end">
                <Link to={`/course-details/6733a1050504535aa7d2cd43`}>
                  <button className="btn btn-primary">More Details</button>
                </Link>
              </div>
            </div>
          </div>
          {/* GitHub Course Card */}
          <div className="card card-compact  bg-white w-72 shadow-xl">
            <figure className="h-40 overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src="https://res.cloudinary.com/df2vobhg0/image/upload/c_thumb,w_200,g_face/v1731438119/github_fdhvi2.png"
                alt="GitHub Course"
              />
            </figure>
            <div className="card-body h-64">
              <h2 className="card-title font-bold text-black">GitHub Course!</h2>
              <p className="text-slate-900">
                Learn Git, GitHub, Node.js, NPM, Object-oriented JavaScript, ES6, webpack, Netlify, BEM, and Job Interview Tips
              </p>
              <p className="text-sm text-black font-bold">₹4000</p>
              <p className="text-base font-black text-red-950">Duration: 9 months</p>
              <div className="card-actions justify-end my-5  ">
                <Link to={`/course-details/67358fe3a996a69d1fb98b7a`}>
                  <button className="btn btn-primary">More Details</button>
                </Link>
              </div>
            </div>
          </div>
          {/*Python Course Card*/}
          <div className="card card-compact  bg-white w-72  shadow-xl">
            <figure className="h-40 overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src="https://res.cloudinary.com/df2vobhg0/image/upload/v1731563891/Python_cen9pp.png"
                alt="Python Course"
              />
            </figure>
            <div className="card-body h-64">
              <h2 className="card-title font-bold text-black">Python Course</h2>
              <p className="text-slate-900">
                Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!
              </p>
              <p className="text-sm text-black font-bold">₹9000</p>
              <p className="text-base font-black text-red-950">Duration: 12 months</p>
              <div className="card-actions justify-end">
                <Link to={`/course-details/67358ecaa996a69d1fb98b75`}>
                  <button className="btn btn-primary">More Details</button>
                </Link>
              </div>
            </div>
          </div>
          {/*JAVA Course Card*/}
          <div className="card card-compact  bg-white w-72 shadow-xl">
            <figure className="h-40 overflow-hidden">
              <img
                className="w-full object-cover"
                src="https://res.cloudinary.com/df2vobhg0/image/upload/v1731565755/Java_pxioq4.jpg"
                alt="JAVA Course"
              />
            </figure>
            <div className="card-body h-64">
              <h2 className="card-title font-bold text-black">JAVA Course!</h2>
              <p className="text-slate-900">
                Acquire Key Java Skills: From Basics to Advanced Programming and Certification - Start Your Dev Career
                Bestseller
              </p>
              <p className="text-sm text-black font-bold">₹12000</p>
              <p className="text-base font-black text-red-950">Duration: 12 months</p>
              <div className="card-actions justify-end my-5">
                <Link to={`/course-details/673598f2a996a69d1fb98b80`}>
                  <button className="btn btn-primary">More Details</button>
                </Link>
              </div>
            </div>
          </div>
          {/*All courses*/}
          <div className="m-100 ">

            <Link to="/course" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  flex items-center space-x-2">
              <span className="font-serif"> All Courses</span>
              <svg className="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10.293 15.707a1 1 0 0 1 0-1.414L13.586 11H4a1 1 0 0 1 0-2h9.586l-3.293-3.293a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z" />
              </svg>
            </Link>


          </div>
        </div>

      </div>

      <div className='bg-cyan-100 min-h-80'>
        <Testimonials />
      </div>
    </div>
  )
}
