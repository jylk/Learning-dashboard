import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

 export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      quote: 'This e-learning platform has transformed the way I learn. The courses are engaging and the instructors are top-notch.',
      position: 'Software Engineer',
    },
    {
      id: 2,
      name: 'Jane Smith',
      quote: "I've been able to advance my career by taking courses on this platform. The content is practical and the support is excellent.",
      position: 'Project Manager',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      quote: "As a busy professional, I appreciate the flexibility and convenience of this e-learning platform. It's been a game-changer for me.",
      position: 'Marketing Specialist',
    },
    {
        id: 4,
        name: 'Alvin Lim',
        quote: "This e-learning paltform was truly a game-changer and a great guide for me as we brought Dimensional to life.",
        position: 'Technical Co-Founder, CTO at Dimensional',
      },
  ];

  return (
    <section className="bg-gray-100 py-12 ">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-black">
          What Our Students Say
        </h2>
        <div className=" grid-cols-1 md:grid-cols-2 flex gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <FaQuoteLeft className="text-black text-3xl mb-4" />
                <p className="text-black mb-4 text-lg">{testimonial.quote}</p>
                <FaQuoteRight className="text-black text-3xl mb-4 self-end" />
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-gray-500">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;