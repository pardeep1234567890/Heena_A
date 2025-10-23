import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ImageLoader from './ImageLoader';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);
  const { backend_url } = useContext(AppContext);

  const categories = ['All', 'Bridal', 'Arabic', 'Festival', 'Simple'];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoadingGallery(true);
        const res = await fetch(`${backend_url}/api/gallery`);
        const data = await res.json();
        setImages(data);
        setFilteredImages(data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setIsLoadingGallery(false);
      }
    };

    fetchImages();
  }, [backend_url]);

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
    <div className="py-8 sm:py-12 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8 font-dancing">Our Work</h2>
        
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          {categories.map(category => (
            <button 
              key={category} 
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base transition-all ${
                selectedCategory === category ? 'bg-brand text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoadingGallery ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div 
                key={image._id} 
                className="overflow-hidden rounded-lg shadow-md cursor-pointer"
                onClick={() => openLightbox(image.imageUrl)}
              >
                <ImageLoader
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  aspectRatio="square"
                />
              </div>
            ))}
          </div>
        )}
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
            <ImageLoader
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-screen-lg max-h-screen-lg"
              loaderSize="large"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
