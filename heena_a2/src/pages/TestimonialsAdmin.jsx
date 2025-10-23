import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({ author: '', text: '', rating: 5 });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { backend_url } = useContext(AppContext);

  useEffect(() => {
    fetchTestimonials();
  }, [backend_url]);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      if (backend_url) {
        const { data } = await axios.get(`${backend_url}/api/testimonials`);
        setTestimonials(data);
      }
    } catch (error) {
      toast.error('Failed to fetch testimonials');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${backend_url}/api/testimonials/${editingId}`, formData);
        toast.success('Testimonial updated successfully');
      } else {
        await axios.post(`${backend_url}/api/testimonials`, formData);
        toast.success('Testimonial added successfully');
      }
      fetchTestimonials();
      setFormData({ author: '', text: '', rating: 5 });
      setEditingId(null);
    } catch (error) {
      toast.error('Failed to save testimonial');
      console.error(error);
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({ author: testimonial.author, text: testimonial.text, rating: testimonial.rating || 5 });
    setEditingId(testimonial._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backend_url}/api/testimonials/${id}`);
      toast.success('Testimonial deleted successfully');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete testimonial');
      console.error(error);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Admin Panel - Testimonials</h2>
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-bold mb-4">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Author</label>
              <input type="text" name="author" value={formData.author} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Text</label>
              <textarea name="text" value={formData.text} onChange={handleInputChange} className="w-full p-2 border rounded" required></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Rating (1-5)</label>
              <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} className="w-full p-2 border rounded" min="1" max="5" required />
            </div>
            <button type="submit" className="bg-brand text-white px-4 py-2 rounded-lg">{editingId ? 'Update' : 'Add'}</button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ author: '', text: '', rating: 5 }); }} className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-4">Cancel</button>
            )}
          </form>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading testimonials...</p>
              </div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No testimonials found</p>
            </div>
          ) : (
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4">Author</th>
                  <th className="p-4">Text</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map(testimonial => (
                  <tr key={testimonial._id} className="border-b">
                    <td className="p-4">{testimonial.author}</td>
                    <td className="p-4">{testimonial.text}</td>
                    <td className="p-4">{testimonial.rating}</td>
                    <td className="p-4">
                      <button onClick={() => handleEdit(testimonial)} className="text-blue-600 hover:underline mr-4">Edit</button>
                      <button onClick={() => handleDelete(testimonial._id)} className="text-red-600 hover:underline">Delete</button>
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

export default TestimonialsAdmin;