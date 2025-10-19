import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const { backend_url } = useContext(AppContext)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })      // ...formdata : it keeps all previous values and only updates the changed one.
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backend_url+"/api/auth/signup", formData);
      console.log(data)
      if (data.token) {
        toast.success("Registration successful!");
        localStorage.setItem("token", data.token);
        navigate('/login');
      } else {
        toast.error(data.msg || "Registration failed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed. Please try again.");
      console.error(err);
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${backend_url}/api/auth/google`;
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
          <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-md hover:bg-gray-50 transition duration-300 mt-4">
            <img src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google logo" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
          <p className="text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-orange-700 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
