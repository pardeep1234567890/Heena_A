import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { backend_url } = useContext(AppContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        if (backend_url) {
          const { data } = await axios.get(`${backend_url}/api/bookings`);
          setBookings(data);
        }
      } catch (error) {
        toast.error('Failed to fetch bookings');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [backend_url]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const { data } = await axios.put(`${backend_url}/api/bookings/${id}`, { status });
      setBookings(bookings.map(booking => (booking._id === id ? data : booking)));
      toast.success(`Booking ${status}`);
    } catch (error) {
      toast.error('Failed to update booking status');
      console.error(error);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Admin Panel - Booking Requests</h2>
        <div className="bg-white p-8 rounded-lg shadow-md overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading bookings...</p>
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No bookings found</p>
            </div>
          ) : (
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4">Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Event Type</th>
                  <th className="p-4">Event Date</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Preferences</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id} className="border-b">
                    <td className="p-4">{booking.name}</td>
                    <td className="p-4">{booking.phone}</td>
                    <td className="p-4">{booking.eventType}</td>
                    <td className="p-4">{new Date(booking.eventDate).toLocaleDateString()}</td>
                    <td className="p-4">{booking.location}</td>
                    <td className="p-4">{booking.preferences}</td>
                    <td className="p-4">{booking.status}</td>
                    <td className="p-4">
                      <button onClick={() => handleStatusUpdate(booking._id, 'approved')} className="text-green-600 hover:underline mr-4">Approve</button>
                      <button onClick={() => handleStatusUpdate(booking._id, 'declined')} className="text-red-600 hover:underline">Decline</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
