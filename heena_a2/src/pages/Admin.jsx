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
    <div className="py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8 font-dancing">
          Admin Panel - Booking Requests
        </h2>
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">Loading bookings...</p>
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm sm:text-base md:text-lg">No bookings found</p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="block lg:hidden space-y-4">
                {bookings.map(booking => (
                  <div key={booking._id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-base text-gray-800">{booking.name}</h3>
                        <p className="text-sm text-gray-600">{booking.phone}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                        booking.status === 'declined' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Event Type:</span>
                        <span className="text-gray-800">{booking.eventType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Event Date:</span>
                        <span className="text-gray-800">{new Date(booking.eventDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Location:</span>
                        <span className="text-gray-800">{booking.location}</span>
                      </div>
                      {booking.preferences && (
                        <div>
                          <span className="text-gray-600 font-medium">Preferences:</span>
                          <p className="text-gray-800 mt-1">{booking.preferences}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 pt-3 border-t">
                      <button 
                        onClick={() => handleStatusUpdate(booking._id, 'approved')} 
                        className="flex-1 bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition text-sm font-medium"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(booking._id, 'declined')} 
                        className="flex-1 bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 transition text-sm font-medium"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-sm">Name</th>
                      <th className="p-3 text-sm">Phone</th>
                      <th className="p-3 text-sm">Event Type</th>
                      <th className="p-3 text-sm">Event Date</th>
                      <th className="p-3 text-sm">Location</th>
                      <th className="p-3 text-sm">Preferences</th>
                      <th className="p-3 text-sm">Status</th>
                      <th className="p-3 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking._id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-sm">{booking.name}</td>
                        <td className="p-3 text-sm">{booking.phone}</td>
                        <td className="p-3 text-sm">{booking.eventType}</td>
                        <td className="p-3 text-sm">{new Date(booking.eventDate).toLocaleDateString()}</td>
                        <td className="p-3 text-sm">{booking.location}</td>
                        <td className="p-3 text-sm max-w-[200px] truncate" title={booking.preferences}>
                          {booking.preferences}
                        </td>
                        <td className="p-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                            booking.status === 'declined' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleStatusUpdate(booking._id, 'approved')} 
                              className="text-green-600 hover:underline text-sm whitespace-nowrap"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(booking._id, 'declined')} 
                              className="text-red-600 hover:underline text-sm whitespace-nowrap"
                            >
                              Decline
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
