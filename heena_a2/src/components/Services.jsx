import React from 'react';

const services = [
  {
    name: 'Bridal Mehndi',
    description: 'Intricate and detailed designs for the bride, tailored to your style.'
  },
  {
    name: 'Engagement & Sangeet',
    description: 'Elegant designs perfect for engagement ceremonies and sangeet parties.'
  },
  {
    name: 'Karva Chauth & Festivals',
    description: 'Celebrate festivals with beautiful and traditional Mehandi patterns.'
  },
  {
    name: 'Simple Designs',
    description: 'Minimalist and modern designs for any occasion.'
  }
];

const Services = () => {
  return (
    <div className="py-8 sm:py-12 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8 font-dancing">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {services.map(service => (
            <div key={service.name} className="bg-white p-5 sm:p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-sm sm:text-base text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
