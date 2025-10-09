import React from 'react';

// Mock data - later this will be fetched from your backend
const mockBookings = [
  {
    id: 1,
    name: 'Pardeep Yadav',
    phone: '123-456-7890',
    eventType: 'Bridal Mehndi',
    eventDate: '2025-12-10',
    location: 'At Venue/Home',
    preferences: 'Traditional full-hand designs.'
  },
  {
    id: 2,
    name: 'Heena Anshu',
    phone: '098-765-4321',
    eventType: 'Engagement & Sangeet',
    eventDate: '2025-11-22',
    location: "Artist's Location",
    preferences: 'Simple Arabic design on one hand.'
  }
];

const Admin = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Admin Panel - Booking Requests</h2>
        <div className="bg-white p-8 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Event Type</th>
                <th className="p-4">Event Date</th>
                <th className="p-4">Location</th>
                <th className="p-4">Preferences</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map(booking => (
                <tr key={booking.id} className="border-b">
                  <td className="p-4">{booking.name}</td>
                  <td className="p-4">{booking.phone}</td>
                  <td className="p-4">{booking.eventType}</td>
                  <td className="p-4">{booking.eventDate}</td>
                  <td className="p-4">{booking.location}</td>
                  <td className="p-4">{booking.preferences}</td>
                  <td className="p-4">
                    <button className="text-green-600 hover:underline mr-4">Approve</button>
                    <button className="text-red-600 hover:underline">Decline</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
