import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const GalleryAdmin = () => {
  const [gallery, setGallery] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { backend_url } = useContext(AppContext);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      if (backend_url) {
        const { data } = await axios.get(`${backend_url}/api/gallery`);
        setGallery(data);
      }
    } catch (error) {
      toast.error('Failed to fetch gallery');
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const res = await axios.post(`${backend_url}/api/gallery`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setGallery([...gallery, res.data]);
      toast.success('Image uploaded successfully');
      setFile(null);
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
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
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Admin Panel - Gallery</h2>
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-bold mb-4">Upload New Image</h3>
          <input type="file" onChange={handleFileChange} className="mb-4" />
          <button onClick={handleUpload} disabled={uploading} className="bg-brand text-white px-4 py-2 rounded-lg">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4">Image</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {gallery.map(item => (
                <tr key={item._id} className="border-b">
                  <td className="p-4"><img src={item.url} alt="Gallery" className="w-32 h-32 object-cover" /></td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline">Delete</button>
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

export default GalleryAdmin;
