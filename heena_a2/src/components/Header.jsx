import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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
    } else {
      toast.error('Login/signup first');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

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
          {token ? (
            <>
              {!isAdmin && (
                <>
                  <li><button onClick={handleBookingClick} className="hover:text-gray-300">Book Now</button></li>
                  {/* <li><Link to="/generator" className="hover:text-gray-300">AI Generator</Link></li> */}
                </>
              )}
              {isAdmin && (
                <>
                  <li><Link to="/admin" className="hover:text-gray-300">Bookings</Link></li>
                  <li><Link to="/admin/gallery" className="hover:text-gray-300">Admin-Gallery</Link></li>
                  <li><Link to="/admin/users" className="hover:text-gray-300">Users</Link></li>
                  <li><Link to="/admin/testimonials" className="hover:text-gray-300">Testimonials</Link></li>
                </>
              )}
              <li><button onClick={handleLogout} className="hover:text-gray-300">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
              <li><Link to="/signup" className="hover:text-gray-300">Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
