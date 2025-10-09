import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-brand text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold font-dancing">
          <Link to="/">Heena by Anshu</Link>
        </h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link to="/services" className="hover:text-gray-300">Services</Link></li>
          <li><Link to="/gallery" className="hover:text-gray-300">Gallery</Link></li>
          <li><Link to="/booking" className="hover:text-gray-300">Book Now</Link></li>
          <li><Link to="/generator" className="hover:text-gray-300">AI Generator</Link></li>
          <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
          <li><Link to="/signup" className="hover:text-gray-300">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
