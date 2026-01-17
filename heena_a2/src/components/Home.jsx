import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MehandiBg from '../assets/mehandi-background.jpg';
import Testimonials from './Testimonials';
import Services from './Services'
import About from './About'

const Home = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/booking');
    } else {
      toast.error('Sign Up first');
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${MehandiBg})` }}
    >
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center p-6 sm:p-8 md:p-12 lg:p-16 bg-white bg-opacity-75 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-dancing">
            Welcome to Heena by Anshu
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-2">
            Your one-stop destination for beautiful and intricate Mehandi designs for all occasions.
          </p>
          <button
            onClick={handleBookingClick}
            className="bg-brand text-white font-bold py-3 px-6 sm:px-8 rounded-full hover:bg-orange-700 transition duration-300 text-sm sm:text-base"
          >
            Book an Appointment
          </button>
        </div>
      </div>
      <About/>
      <Services />
      <Testimonials />
    </div>
  );
};

export default Home;
