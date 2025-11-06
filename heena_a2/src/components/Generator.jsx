import React, { useState } from 'react';
import ImageLoader from './ImageLoader';

const Generator = () => {
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
      const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
        },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate image: ${errorText}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
    } catch (err) {
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

      {error && <p className="text-red-500">{error}</p>}

      {loading && (
        <div>
          <p>Generating your design, please wait...</p>
          {/* You can add a spinner here */}
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
