import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [editingId, setEditingId] = useState(null);
  const { backend_url } = useContext(AppContext);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      if (backend_url) {
        const { data } = await axios.get(`${backend_url}/api/testimonials`);
        setTestimonials(data);
      }
    } catch (error) {
      toast.error('Failed to fetch testimonials');
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      setFormData({ name: '', message: '' });
      setEditingId(null);
    } catch (error) {
      toast.error('Failed to save testimonial');
      console.error(error);
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({ name: testimonial.name, message: testimonial.message });
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
              <label className="block text-gray-700">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} className="w-full p-2 border rounded"></textarea>
            </div>
            <button type="submit" className="bg-brand text-white px-4 py-2 rounded-lg">{editingId ? 'Update' : 'Add'}</button>
          </form>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4">Name</th>
                <th className="p-4">Message</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map(testimonial => (
                <tr key={testimonial._id} className="border-b">
                  <td className="p-4">{testimonial.name}</td>
                  <td className="p-4">{testimonial.message}</td>
                  <td className="p-4">
                    <button onClick={() => handleEdit(testimonial)} className="text-blue-600 hover:underline mr-4">Edit</button>
                    <button onClick={() => handleDelete(testimonial._id)} className="text-red-600 hover:underline">Delete</button>
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

export default TestimonialsAdmin;
