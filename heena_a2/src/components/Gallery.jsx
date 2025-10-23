import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const categories = ['All', 'Bridal', 'Arabic', 'Festival', 'Simple'];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery`);
        const data = await res.json();
        setImages(data);
        setFilteredImages(data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(image => image.category === selectedCategory));
    }
  }, [selectedCategory, images]);

  const openLightbox = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage('');
  };

  return (
    <div className="py-12 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Our Work</h2>
        
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map(category => (
            <button 
              key={category} 
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-bold ${selectedCategory === category ? 'bg-brand text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div key={image._id} className="overflow-hidden rounded-lg shadow-md cursor-pointer" onClick={() => openLightbox(image.imageUrl)}>
              <img src={image.imageUrl} alt={image.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <div className="relative">
            <button 
              className="absolute -top-8 -right-8 text-white text-3xl"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <img src={selectedImage} alt="Enlarged view" className="max-w-screen-lg max-h-screen-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
