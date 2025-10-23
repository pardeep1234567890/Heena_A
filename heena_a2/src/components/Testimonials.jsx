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
    <div className="py-12 bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial._id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">{testimonial.message}</p>
              <p className="text-right font-bold text-brand">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
