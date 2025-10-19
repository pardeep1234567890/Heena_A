import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({ author: '', text: '', rating: 5 });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get('/api/testimonials');
      setTestimonials(data);
    } catch (error) {
      toast.error('Failed to fetch testimonials');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/testimonials/${editingId}`, formData);
        toast.success('Testimonial updated!');
      } else {
        await axios.post('/api/testimonials', formData);
        toast.success('Testimonial added!');
      }
      setFormData({ author: '', text: '', rating: 5 });
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to save testimonial');
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({ author: testimonial.author, text: testimonial.text, rating: testimonial.rating });
    setEditingId(testimonial._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/testimonials/${id}`);
      toast.success('Testimonial deleted!');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Manage Testimonials</h2>
        
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-bold mb-4">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required className="w-full p-3 border rounded-md" />
            <textarea name="text" placeholder="Testimonial text" value={formData.text} onChange={handleChange} required rows="4" className="w-full p-3 border rounded-md"></textarea>
            <div>
              <label className="block text-gray-700">Rating</label>
              <select name="rating" value={formData.rating} onChange={handleChange} className="w-full p-3 border rounded-md">
                {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full bg-brand text-white font-bold py-3 rounded-md hover:bg-orange-700 transition duration-300">{editingId ? 'Update' : 'Add'}</button>
            {editingId && <button onClick={() => { setEditingId(null); setFormData({ author: '', text: '', rating: 5 }); }} className="w-full bg-gray-500 text-white font-bold py-3 rounded-md mt-2">Cancel Edit</button>}
          </form>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Existing Testimonials</h3>
          <div className="space-y-4">
            {testimonials.map(t => (
              <div key={t._id} className="border p-4 rounded-md">
                <p className="font-bold">{t.author} ({t.rating}/5)</p>
                <p>{t.text}</p>
                <div className="mt-2">
                  <button onClick={() => handleEdit(t)} className="text-blue-600 hover:underline mr-4">Edit</button>
                  <button onClick={() => handleDelete(t._id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsAdmin;
