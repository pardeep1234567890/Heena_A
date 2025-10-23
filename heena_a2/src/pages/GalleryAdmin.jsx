import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import ImageLoader from '../components/ImageLoader';

const GalleryAdmin = () => {
  const [gallery, setGallery] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Bridal');
  const [loading, setLoading] = useState(false);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);
  const { backend_url } = useContext(AppContext);

  const categories = ['Bridal', 'Arabic', 'Festival', 'Simple'];

  useEffect(() => {
    fetchGallery();
  }, [backend_url]);

  const fetchGallery = async () => {
    try {
      setIsLoadingGallery(true);
      if (backend_url) {
        const { data } = await axios.get(`${backend_url}/api/gallery`);
        setGallery(data);
      }
    } catch (error) {
      toast.error('Failed to fetch gallery');
      console.error(error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please select a file to upload');
      return;
    }
    if (!title) {
      toast.error('Please enter an image title');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', category);
    setLoading(true);

    try {
      const res = await axios.post(`${backend_url}/api/gallery`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setGallery([...gallery, res.data]);
      toast.success('Image uploaded successfully');
      setImage(null);
      setTitle('');
      setCategory('Bridal');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backend_url}/api/gallery/${id}`);
      setGallery(gallery.filter(item => item._id !== id));
      toast.success('Image deleted successfully');
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
          {isLoadingGallery ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading gallery...</p>
              </div>
            </div>
          ) : gallery.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">No images in gallery yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img) => (
                <div key={img._id} className="relative">
                  <ImageLoader
                    src={img.imageUrl || img.url}
                    alt={img.title || 'Gallery Image'}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                    loaderSize="medium"
                  />
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
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryAdmin;
