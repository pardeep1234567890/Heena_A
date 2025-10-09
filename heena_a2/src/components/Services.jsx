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
    <div className="py-12 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(service => (
            <div key={service.name} className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
