import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      toast.success('Logged in successfully');
      navigate('/');
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default GoogleAuthCallback;
