import React from 'react';

const About = () => {
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/3 mb-6 md:mb-0">
          {/* Placeholder for an image of the artist */}
          <div className="w-48 h-48 bg-gray-300 rounded-full mx-auto"></div>
        </div>
        <div className="md:w-2/3 md:pl-8 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-dancing">About Heena by Anshu</h2>
          <p className="text-gray-600 leading-relaxed">
            Anshu is a passionate and skilled Mehandi artist with years of experience in creating stunning and unique designs. Her expertise ranges from traditional bridal Mehandi to modern and contemporary patterns. She is dedicated to making your special occasions even more memorable with the art of Heena.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
