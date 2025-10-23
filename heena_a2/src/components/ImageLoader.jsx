import React, { useState } from 'react';

const ImageLoader = ({ 
  src, 
  alt, 
  className = '', 
  loaderSize = 'medium',
  aspectRatio = 'auto'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loaderSizes = {
    small: 'h-6 w-6 border-2',
    medium: 'h-10 w-10 border-4',
    large: 'h-16 w-16 border-4'
  };

  const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: ''
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative ${aspectRatios[aspectRatio] || aspectRatio}`}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className={`animate-spin rounded-full border-t-brand border-b-brand ${loaderSizes[loaderSize]}`}></div>
        </div>
      )}
      
      {hasError ? (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Failed to load</p>
          </div>
        </div>
      ) : (
        <img 
          src={src} 
          alt={alt} 
          className={`${className} transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </div>
  );
};

export default ImageLoader;
