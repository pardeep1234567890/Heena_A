import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const { backend_url } = useContext(AppContext);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        if (backend_url) {
          const { data } = await axios.get(`${backend_url}/api/testimonials`);
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials', error);
      }
    };

    fetchTestimonials();
  }, [backend_url]);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-6 sm:mb-8 font-dancing">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial._id} className="bg-white bg-opacity-50 p-5 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <p className="text-sm sm:text-base text-gray-800 italic">"{testimonial.text}"</p>
              <p className="text-right font-bold mt-3 sm:mt-4 text-sm sm:text-base">- {testimonial.author}</p>
              <div className="text-right text-yellow-500 text-lg">
                {'★'.repeat(testimonial.rating)}
                {'☆'.repeat(5 - testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;