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
    <div className="py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8 font-dancing">
          Admin Panel - Testimonials
        </h2>
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm sm:text-base mb-1">Author</label>
              <input 
                type="text" 
                name="author" 
                value={formData.author} 
                onChange={handleInputChange} 
                className="w-full p-2 sm:p-2.5 border rounded text-sm sm:text-base" 
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm sm:text-base mb-1">Text</label>
              <textarea 
                name="text" 
                value={formData.text} 
                onChange={handleInputChange} 
                className="w-full p-2 sm:p-2.5 border rounded text-sm sm:text-base" 
                rows="4"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 text-sm sm:text-base mb-1">Rating (1-5)</label>
              <input 
                type="number" 
                name="rating" 
                value={formData.rating} 
                onChange={handleInputChange} 
                className="w-full p-2 sm:p-2.5 border rounded text-sm sm:text-base" 
                min="1" 
                max="5" 
                required 
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button 
                type="submit" 
                className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition text-sm sm:text-base"
              >
                {editingId ? 'Update' : 'Add'}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={() => { setEditingId(null); setFormData({ author: '', text: '', rating: 5 }); }} 
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition text-sm sm:text-base"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">Loading testimonials...</p>
              </div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm sm:text-base md:text-lg">No testimonials found</p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="block lg:hidden space-y-4">
                {testimonials.map(testimonial => (
                  <div key={testimonial._id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-base text-gray-800">{testimonial.author}</h3>
                      <div className="text-yellow-500 text-lg">
                        {'★'.repeat(testimonial.rating)}
                        {'☆'.repeat(5 - testimonial.rating)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 italic mb-4">"{testimonial.text}"</p>
                    
                    <div className="flex gap-2 pt-3 border-t">
                      <button 
                        onClick={() => handleEdit(testimonial)} 
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(testimonial._id)} 
                        className="flex-1 bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 transition text-sm font-medium"
                      >
                        Delete
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
                      <th className="p-3 text-sm">Author</th>
                      <th className="p-3 text-sm">Text</th>
                      <th className="p-3 text-sm">Rating</th>
                      <th className="p-3 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonials.map(testimonial => (
                      <tr key={testimonial._id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-sm font-medium">{testimonial.author}</td>
                        <td className="p-3 text-sm max-w-md">
                          <p className="line-clamp-2" title={testimonial.text}>"{testimonial.text}"</p>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="text-yellow-500 text-base">
                            {'★'.repeat(testimonial.rating)}
                            {'☆'.repeat(5 - testimonial.rating)}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEdit(testimonial)} 
                              className="text-blue-600 hover:underline text-sm whitespace-nowrap"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(testimonial._id)} 
                              className="text-red-600 hover:underline text-sm whitespace-nowrap"
                            >
                              Delete
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

export default TestimonialsAdmin;