import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ImageLoader from './ImageLoader';

const Booking = () => {
  const { backend_url } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
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
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      
      // Create image preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataWithImage = new FormData();
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }

      const res = await fetch(`${backend_url}/api/bookings`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data' // Let browser set this for FormData
        },
        body: formDataWithImage
      });

      if (res.ok) {
        alert('Your booking request has been submitted! We will contact you shortly.');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          eventType: 'Bridal',
          eventDate: '',
          location: 'At Venue/Home',
          preferences: '',
          referenceImage: null
        });
        setImagePreview(null);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
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
            <div className="flex items-center space-x-4">
              <label><input type="radio" name="location" value="At Venue/Home" checked={formData.location === 'At Venue/Home'} onChange={handleChange} className="mr-2" />At Venue/Home</label>
              <label><input type="radio" name="location" value="Artist's Location" checked={formData.location === "Artist's Location"} onChange={handleChange} className="mr-2" />Artist's Location</label>
            </div>
          </div>

          <textarea name="preferences" placeholder="Design Preferences (e.g., traditional, modern, specific patterns)" onChange={handleChange} value={formData.preferences} rows="4" className="w-full p-3 border rounded-md"></textarea>

          <div>
            <label htmlFor="referenceImage" className="block text-gray-700 mb-2">Upload Reference Image (Optional)</label>
            <input type="file" name="referenceImage" id="referenceImage" onChange={handleChange} accept="image/*" className="w-full p-3 border rounded-md" />
            
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <div className="max-w-xs">
                  <ImageLoader 
                    src={imagePreview} 
                    alt="Reference preview" 
                    className="w-full h-auto rounded-lg border"
                    loaderSize="medium"
                  />
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full font-bold py-3 px-8 rounded-full transition duration-300 flex items-center justify-center ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-brand text-white hover:bg-orange-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                Submitting...
              </>
            ) : (
              'Submit Request'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;