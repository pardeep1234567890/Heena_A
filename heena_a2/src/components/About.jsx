import React from 'react';
import ImageLoader from './ImageLoader';

const About = () => {
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <ImageLoader 
            src="/aa2.png" 
            alt="Heena by Anshu" 
            className="w-48 h-48 object-cover rounded-full mx-auto shadow-lg"
            loaderSize="large"
          />
        </div>
        <div className="md:w-2/3 md:pl-8 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-dancing">About Heena by Anshu</h2>
          <p className="text-gray-600 leading-relaxed">
            I am a passionate and skilled Mehandi artist with years of experience in creating stunning and unique designs. My expertise ranges from traditional bridal Mehandi to modern and contemporary patterns. I am dedicated to making your special occasions even more memorable with the art of Heena.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

