import React from "react";

export const MentorAbout = () => {
  return (
    <div className="about-and-contact-page">
      {/* Hero Section */}
      <div className="about-and-contact-page">
  {/* Hero Section */}
  <div className="hero bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 py-20 relative overflow-hidden">
  {/* Background image with a subtle blur effect */}
  

  <div className="container mx-auto px-6 text-center relative z-10">
    <h1 className="text-5xl font-extrabold text-blue-700 mb-6 animate__animated animate__fadeIn animate__delay-1s">
      About Us
    </h1>

    <p className="text-gray-700 text-lg max-w-2xl mx-auto animate__animated animate__slideInUp animate__delay-2s">
      Welcome to <span className="font-semibold text-purple-600">E-Learn</span>, your go-to platform for quality education, accessible to everyone, everywhere.
    </p>

    {/* Call to Action Button with hover and animation */}
    <div className="mt-8">
      <button className="bg-purple-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transform transition duration-300 ease-in-out animate__animated animate__pulse animate__infinite">
        Learn More
      </button>
    </div>

    {/* Animated Icon for Engagement */}
    <div className="mt-8">
      <div className="flex justify-center">
        <div className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transform transition duration-300 ease-in-out animate__animated animate__bounce animate__delay-3s">
          <img src="https://res.cloudinary.com/df2vobhg0/image/upload/v1731948564/yhsajudioqz4hyupy7bf.jpg" alt="E-Learning Icon" className="w-16 h-16"/>
        </div>
      </div>
    </div>
  </div>
</div>

{/* New Section - Features with Images */}
<div className="features bg-gray-50 py-20">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-blue-700 mb-8 ">
      Our Key Features
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Feature Card 1 */}
      <div className="feature-card p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition duration-300 animate__animated animate__fadeIn ">
        <img src="https://res.cloudinary.com/df2vobhg0/image/upload/v1731948173/a57xlpwb6xqmkzltcur7.jpg" className="w-full h-48 object-cover rounded-lg"/>
        <h3 className="text-xl font-bold text-black  mb-2">Interactive Learning</h3>
        <p className="text-black">Engage with dynamic and interactive content that enhances your learning experience.</p>
      </div>

      {/* Feature Card 2 */}
      <div className="feature-card p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition duration-300 animate__animated animate__fadeIn animate__delay-6s">
        <img src="https://res.cloudinary.com/df2vobhg0/image/upload/v1731948156/xy5dkct9ze2rmzoljjdg.jpg" className="w-full h-48 object-cover rounded-lg" />
        <h3 className="text-xl font-bold text-black mb-2">Personalized Lessons</h3>
        <p className="text-black">Learn at your own pace with lessons tailored to your skills and preferences.</p>
      </div>

      {/* Feature Card 3 */}
      <div className="feature-card p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition duration-300 animate__animated animate__fadeIn animate__delay-7s">
        <img src="https://res.cloudinary.com/df2vobhg0/image/upload/v1731948151/images_btdg2n.jpg" alt="Expert Tutors" className="w-full h-48 object-cover rounded-lg "/>
        <h3 className="text-xl font-bold text-black mb-2">Expert Tutors</h3>
        <p className="text-black">Our instructors are experienced professionals in their fields, ensuring top-quality education.</p>
      </div>
    </div>
  </div>
</div>


  {/* Additional Section (Optional) */}
  
</div>


      {/* Features Section */}
      <div className="features py-16 bg-gradient-to-r from-gray-50 via-white to-gray-50">
  <div className="container mx-auto px-6">
    <div className="grid md:grid-cols-3 gap-10">
      {/* Mission */}
      <div
        className="feature text-center bg-white shadow-lg rounded-lg p-6 hover:scale-110 hover:shadow-2xl transition-transform duration-500 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-100 opacity-0 hover:opacity-20 transition-opacity duration-500"></div>
        <h2 className="text-3xl font-extrabold text-blue-600 mb-4">Mission</h2>
        <p className="text-gray-600 text-lg">
          Empower learners around the world by providing engaging, interactive, and affordable education.
        </p>
        <div className="mt-6">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Vision */}
      <div
        className="feature text-center bg-white shadow-lg rounded-lg p-6 hover:scale-110 hover:shadow-2xl transition-transform duration-500 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-purple-100 opacity-0 hover:opacity-20 transition-opacity duration-500"></div>
        <h2 className="text-3xl font-extrabold text-purple-600 mb-4">Vision</h2>
        <p className="text-gray-600 text-lg">
          To become a leader in online learning by fostering an inclusive community of lifelong learners.
        </p>
        <div className="mt-6">
          <button
            className="bg-purple-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-purple-700 transition-all duration-300"
          >
            Explore Vision
          </button>
        </div>
      </div>

      {/* Values */}
      <div
        className="feature text-center bg-white shadow-lg rounded-lg p-6 hover:scale-110 hover:shadow-2xl transition-transform duration-500 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-green-100 opacity-0 hover:opacity-20 transition-opacity duration-500"></div>
        <h2 className="text-3xl font-extrabold text-green-600 mb-4">Values</h2>
        <p className="text-gray-600 text-lg">
          Innovation, accessibility, and excellence in delivering world-class education.
        </p>
        <div className="mt-6">
          <button
            className="bg-green-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-green-700 transition-all duration-300"
          >
            Our Values
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Team Section */}
      <div className="team py-16 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-10">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
            {[
              { name: "John Doe", title: "CEO & Founder", img: "https://res.cloudinary.com/df2vobhg0/image/upload/v1731943484/ze1unk7ewfbg2dfmfyzs.jpg" },
              { name: "Jane Smith", title: "CTO", img: "https://res.cloudinary.com/df2vobhg0/image/upload/v1731943508/vorfh8d6mofiklv9c5xt.jpg" },
              { name: "Alice Brown", title: "Lead Designer", img: "https://res.cloudinary.com/df2vobhg0/image/upload/v1731943528/images_wgp20j.jpg" },
              { name: "Mark Wilson", title: "Marketing Manager", img: "https://res.cloudinary.com/df2vobhg0/image/upload/v1731943536/images_p00o1d.jpg" },
            ].map((member, index) => (
              <div key={index} className="team-member bg-white shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 rounded-lg p-6">
                <img src={member.img} alt={member.name} className="rounded-full w-24 h-24 mx-auto border-4 border-blue-100 hover:border-purple-200 transition-all duration-300" />
                <h3 className="text-xl font-bold mt-4">{member.name}</h3>
                <p className="text-gray-600">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* Footer */}
      <div className="footer py-6 bg-gray-800 text-gray-400 text-center">
        <p>© 2024 E-Learn. All Rights Reserved.</p>
      </div>
    </div>
  );
};


