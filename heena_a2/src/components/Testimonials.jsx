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
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-8 font-dancing">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial._id} className="bg-white bg-opacity-75 p-6 rounded-lg shadow-md">
              <p className="text-gray-800 italic">"{testimonial.text}"</p>
              <p className="text-right font-bold mt-4">- {testimonial.author}</p>
              <div className="text-right text-yellow-500">
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