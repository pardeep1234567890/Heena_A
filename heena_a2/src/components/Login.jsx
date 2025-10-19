import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Login = () => {
  const {backend_url} = useContext(AppContext)
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }) // the three dots are spread operator and these are used to create a shallow copy of the existing form object  // The square brackets [] are computed property names, Uses the actual input name as the property key
  }
  const handleSubmit = async (e) => {
    e.preventDefault();   
    try {
      const {data} = await axios.post(backend_url+"/api/auth/login", form)
      if (data.success) {
        toast.success(data.msg);
        localStorage.setItem("token", data.token);
        navigate('/');
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login unsuccessful");
      console.log(error)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${backend_url}/api/auth/google`;
  };

  return (
    <div className="py-12 bg-gray-50 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Login</h2>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={form.email} required className="w-full p-3 border rounded-md" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} value={form.password} required className="w-full p-3 border rounded-md" />
          <button type="submit" className="w-full bg-brand text-white font-bold py-3 rounded-md hover:bg-orange-700 transition duration-300">
            Login
          </button>
          <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-md hover:bg-gray-50 transition duration-300 mt-4">
            <img src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google logo" className="w-5 h-5 mr-2" />
            Continue with Google
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