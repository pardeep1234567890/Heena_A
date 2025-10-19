import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MehandiBg from '../assets/mehandi-background.jpg';
import Testimonials from './Testimonials';

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
      className="w-full bg-cover bg-center" 
      style={{ backgroundImage: `url(${MehandiBg})` }}
    >
      <div className="flex-grow flex items-center justify-center py-16">
        <div className="text-center p-8 sm:p-12 md:p-16 bg-white bg-opacity-75 rounded-lg shadow-lg">
          <h2 className="text-5xl font-bold text-gray-800 mb-4 font-dancing">Welcome to Heena by Anshu</h2>
          <p className="text-lg text-gray-600 mb-8">Your one-stop destination for beautiful and intricate Mehandi designs for all occasions.</p>
          <button
            onClick={handleBookingClick}
            className="bg-brand text-white font-bold py-3 px-8 rounded-full hover:bg-orange-700 transition duration-300"
          >
            Book an Appointment
          </button>
        </div>
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;
