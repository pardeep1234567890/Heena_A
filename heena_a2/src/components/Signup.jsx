import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending signup request:', formData);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      console.log('Response status:', res.status);
      
      // Check if response is ok
      if (!res.ok) {
        const text = await res.text();
        console.error('Error response:', text);
        let errorMsg = 'Signup failed';
        try {
          const errorData = JSON.parse(text);
          errorMsg = errorData.msg || errorData.message || errorMsg;
        } catch {
          errorMsg = text || `HTTP error! status: ${res.status}`;
        }
        throw new Error(errorMsg);
      }
      
      // Check if response has content before parsing JSON
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      
      console.log('Success response:', data);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Signup successful!');
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
    <div className="py-12 bg-gray-50 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Create an Account</h2>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} required className="w-full p-3 border rounded-md" />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={formData.email} required className="w-full p-3 border rounded-md" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required className="w-full p-3 border rounded-md" />
          <button type="submit" className="w-full bg-brand text-white font-bold py-3 rounded-md hover:bg-orange-700 transition duration-300">
            Sign Up
          </button>
          <p className="text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-orange-700 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
