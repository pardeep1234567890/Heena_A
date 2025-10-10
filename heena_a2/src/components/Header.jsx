import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-brand text-white p-4 shadow-md relative">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl sm:text-4xl font-bold font-dancing">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Heena by Anshu</Link>
        </h1>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        <ul className={`md:flex space-x-4 ${isMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-brand p-4 space-y-2' : 'hidden md:flex'}`}>
          <li><Link to="/" className="hover:text-gray-300 block py-2 px-4" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-300 block py-2" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link to="/services" className="hover:text-gray-300 block py-2" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
          <li><Link to="/gallery" className="hover:text-gray-300 block py-2" onClick={() => setIsMenuOpen(false)}>Gallery</Link></li>
          <li><Link to="/booking" className="hover:text-gray-300 block py-2" onClick={() => setIsMenuOpen(false)}>Book Now</Link></li>
          <li><Link to="/generator" className="hover:text-gray-300 block py-2" onClick={() => setIsMenuOpen(false)}>AI Generator</Link></li>
          <li><Link to="/login" className="hover:text-gray-300 block py-2" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
          <li><Link to="/signup" className="hover:text-gray-300 block py-2" onClick={() => setIsMenuOpen(false)}>Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
