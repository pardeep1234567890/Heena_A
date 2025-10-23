import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const decodedToken = token ? parseJwt(token) : null;
  const isAdmin = decodedToken && decodedToken.user.role === 'admin';

  const handleBookingClick = () => {
    if (token) {
      navigate('/booking');
      setIsMenuOpen(false);
    } else {
      toast.error('Login/signup first');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-brand text-white p-4 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-dancing">
            <Link to="/" onClick={closeMenu}>Heena by Anshu</Link>
          </h1>
          
          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-4 items-center">
            <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-300 transition">About</Link></li>
            <li><Link to="/services" className="hover:text-gray-300 transition">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-gray-300 transition">Gallery</Link></li>
            {token ? (
              <>
                {!isAdmin && (
                  <>
                    <li><button onClick={handleBookingClick} className="hover:text-gray-300 transition">Book Now</button></li>
                  </>
                )}
                {isAdmin && (
                  <>
                    <li><Link to="/admin" className="hover:text-gray-300 transition">Bookings</Link></li>
                    <li><Link to="/admin/gallery" className="hover:text-gray-300 transition">Admin-Gallery</Link></li>
                    <li><Link to="/admin/users" className="hover:text-gray-300 transition">Users</Link></li>
                    <li><Link to="/admin/testimonials" className="hover:text-gray-300 transition">Testimonials</Link></li>
                  </>
                )}
                <li><button onClick={handleLogout} className="hover:text-gray-300 transition">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-gray-300 transition">Login</Link></li>
                <li><Link to="/signup" className="hover:text-gray-300 transition">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col space-y-3 py-4">
            <li><Link to="/" onClick={closeMenu} className="block hover:text-gray-300 transition py-2">Home</Link></li>
            <li><Link to="/about" onClick={closeMenu} className="block hover:text-gray-300 transition py-2">About</Link></li>
            <li><Link to="/services" onClick={closeMenu} className="block hover:text-gray-300 transition py-2">Services</Link></li>
            <li><Link to="/gallery" onClick={closeMenu} className="block hover:text-gray-300 transition py-2">Gallery</Link></li>
            {token ? (
              <>
                {!isAdmin && (
                  <>
                    <li><button onClick={handleBookingClick} className="block w-full text-left hover:text-gray-300 transition py-2">Book Now</button></li>
                  </>
                )}
                {isAdmin && (
                  <>
                    <li><Link to="/admin" onClick={closeMenu} className="block hover:text-gray-300 transition py-2">Bookings</Link></li>
                    <li><Link to="/admin/gallery" onClick={closeMenu} className="block hover:text-gray-300 transition py-2">Admin-Gallery</Link></li>
                    <li><Link to="/admin/users" onClick={closeMenu} className="block hover:text-gray-300 transition py-2">Users</Link></li>
                    <li><Link to="/admin/testimonials" onClick={closeMenu} className="block hover:text-gray-300 transition py-2">Testimonials</Link></li>
                  </>
                )}
                <li><button onClick={handleLogout} className="block w-full text-left hover:text-gray-300 transition py-2">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={closeMenu} className="block hover:text-gray-300 transition py-2">Login</Link></li>
                <li><Link to="/signup" onClick={closeMenu} className="block hover:text-gray-300 transition py-2">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
