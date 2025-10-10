import React, { useState } from 'react';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Bridal',
    eventDate: '',
    location: 'At Venue/Home',
    preferences: '',
    referenceImage: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'referenceImage') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const formDataWithImage = new FormData();
      // for (const key in formData) {
      //   formDataWithImage.append(key, formData[key]);
      // }

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
        // body: formDataWithImage // Use this when handling file uploads
      });

      if (res.ok) {
        alert('Your booking request has been submitted! We will contact you shortly.');
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="py-12 bg-gray-50 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} required className="w-full p-3 border rounded-md" />
          
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} value={formData.phone} required className="w-full p-3 border rounded-md" />
          
          <div>
            <label htmlFor="eventType" className="block text-gray-700 mb-2">Event Type</label>
            <select name="eventType" id="eventType" onChange={handleChange} value={formData.eventType} className="w-full p-3 border rounded-md">
              <option>Bridal Mehndi</option>
              <option>Engagement & Sangeet</option>
              <option>Karva Chauth & Festivals</option>
              <option>Simple Designs</option>
            </select>
          </div>

          <div>
            <label htmlFor="eventDate" className="block text-gray-700 mb-2">Event Date</label>
            <input type="date" name="eventDate" id="eventDate" onChange={handleChange} value={formData.eventDate} required className="w-full p-3 border rounded-md" />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Service Location</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <label className="flex items-center"><input type="radio" name="location" value="At Venue/Home" checked={formData.location === 'At Venue/Home'} onChange={handleChange} className="mr-2" />At Venue/Home</label>
              <label className="flex items-center"><input type="radio" name="location" value="Artist's Location" checked={formData.location === "Artist's Location"} onChange={handleChange} className="mr-2" />Artist's Location</label>
            </div>
          </div>

          <textarea name="preferences" placeholder="Design Preferences (e.g., traditional, modern, specific patterns)" onChange={handleChange} value={formData.preferences} rows="4" className="w-full p-3 border rounded-md"></textarea>

          <div>
            <label htmlFor="referenceImage" className="block text-gray-700 mb-2">Upload Reference Image (Optional)</label>
            <input type="file" name="referenceImage" id="referenceImage" onChange={handleChange} className="w-full p-3 border rounded-md" />
          </div>

          <button type="submit" className="w-full bg-brand text-white font-bold py-3 px-8 rounded-full hover:bg-orange-700 transition duration-300">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
