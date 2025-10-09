import React from 'react';
import { Link } from 'react-router-dom';
import MehandiBg from '../assets/mehandi-background.jpg';

const Home = () => {
  return (
    <div
      className="w-full flex-grow flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${MehandiBg})` }}
    >
      <div className="text-center p-8 sm:p-12 md:p-16 bg-white bg-opacity-75 rounded-lg shadow-lg">
        <h2 className="text-5xl font-bold text-gray-800 mb-4 font-dancing">Welcome to Heena by Anshu</h2>
        <p className="text-lg text-gray-600 mb-8">Your one-stop destination for beautiful and intricate Mehandi designs for all occasions.</p>
        <Link to="/booking">
          <button className="bg-brand text-white font-bold py-3 px-8 rounded-full hover:bg-orange-700 transition duration-300">
            Book an Appointment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
