import React, { useState, useContext } from 'react';
import ImageLoader from './ImageLoader';
import { AppContext } from '../context/AppContext';

const Generator = () => {
  const { backend_url } = useContext(AppContext);
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      console.log('Backend URL:', backend_url);
      console.log('Sending request to:', `${backend_url}/api/generate`);
      
      const response = await fetch(`${backend_url}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Failed to generate image';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.details || errorMessage;
          
          // If model is loading, show helpful message
          if (response.status === 503) {
            errorMessage = errorData.error + '. This usually takes 20-30 seconds.';
          }
        } catch {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
      console.log('Image generated successfully');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-4xl font-bold mb-4">AI Mehandi Design Generator</h2>
      <p className="text-gray-600 mb-8">
        Describe the mehandi design you want to create. For example, "a delicate floral pattern with paisleys on the back of a hand".
      </p>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your design description..."
          className="w-full max-w-lg border border-gray-300 rounded-lg py-2 px-4 mb-4"
          required
        />
        <button
          type="submit"
          className="bg-brand text-white font-bold py-3 px-8 rounded-full hover:bg-orange-700 transition duration-300 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Design'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-2xl mx-auto mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mb-4"></div>
          <p className="text-gray-600">Generating your design, please wait... This may take 20-60 seconds.</p>
        </div>
      )}

      {imageUrl && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Your Generated Design:</h3>
          <ImageLoader 
            src={imageUrl} 
            alt="Generated Mehandi Design" 
            className="mx-auto border rounded-lg shadow-lg max-w-2xl"
            loaderSize="large"
          />
        </div>
      )}
    </div>
  );
};

export default Generator;
