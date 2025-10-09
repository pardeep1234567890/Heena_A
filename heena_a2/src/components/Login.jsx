import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="py-12 bg-gray-50 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Login</h2>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={formData.email} required className="w-full p-3 border rounded-md" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required className="w-full p-3 border rounded-md" />
          <button type="submit" className="w-full bg-brand text-white font-bold py-3 rounded-md hover:bg-orange-700 transition duration-300">
            Login
          </button>
          <p className="text-center text-gray-600">
            Don't have an account? <Link to="/signup" className="text-orange-700 hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
