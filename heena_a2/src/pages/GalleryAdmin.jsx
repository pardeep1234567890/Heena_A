import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const GalleryAdmin = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Bridal');
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ['Bridal', 'Arabic', 'Festival', 'Simple'];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get('/api/gallery');
      setImages(data);
    } catch (error) {
      toast.error('Failed to fetch images');
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const res = await axios.post('/api/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.status === 200) {
        toast.success('Image uploaded successfully!');
        setTitle('');
        setCategory('Bridal');
        setImage(null);
        fetchImages(); // Refresh images after upload
      } else {
        toast.error('Image upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Image upload failed. Please try again.';
      console.error('Error details:', error.response?.data);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/gallery/${id}`);
      toast.success('Image deleted successfully!');
      fetchImages(); // Refresh images after delete
    } catch (error) {
      toast.error('Failed to delete image');
      console.error(error);
    }
  };

  return (
    <div className="py-12 bg-gray-50 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Manage Gallery</h2>
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Upload New Image</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input 
              type="text" 
              name="title" 
              placeholder="Image Title" 
              onChange={(e) => setTitle(e.target.value)} 
              value={title} 
              required 
              className="w-full p-3 border rounded-md" 
            />
            <select 
              name="category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full p-3 border rounded-md"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input 
              type="file" 
              name="image" 
              onChange={(e) => setImage(e.target.files[0])} 
              required 
              className="w-full p-3 border rounded-md" 
            />
            <button 
              type="submit" 
              className="w-full bg-brand text-white font-bold py-3 px-8 rounded-full hover:bg-orange-700 transition duration-300 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Image'}
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Existing Images</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img._id} className="relative">
                <img src={img.imageUrl} alt={img.title} className="w-full h-48 object-cover rounded-lg shadow-md" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xs p-1">{img.category}</div>
                <button 
                  onClick={() => handleDelete(img._id)} 
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryAdmin;
