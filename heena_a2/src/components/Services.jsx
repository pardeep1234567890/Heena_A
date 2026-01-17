import React from 'react';
import { Heart, Sparkles, CalendarHeart, Palette } from 'lucide-react';

const services = [
  {
    name: 'Bridal Mehndi',
    description: 'Intricate and detailed designs for the bride, tailored to your style.',
    icon: <Heart className="w-8 h-8 text-brand" />
  },
  {
    name: 'Engagement & Sangeet',
    description: 'Elegant designs perfect for engagement ceremonies and sangeet parties.',
    icon: <Sparkles className="w-8 h-8 text-brand" />
  },
  {
    name: 'Karva Chauth & Festivals',
    description: 'Celebrate festivals with beautiful and traditional Mehandi patterns.',
    icon: <CalendarHeart className="w-8 h-8 text-brand" />
  },
  {
    name: 'Simple Designs',
    description: 'Minimalist and modern designs for any occasion.',
    icon: <Palette className="w-8 h-8 text-brand" />
  }
];

const Services = () => {
  return (
    <div className="py-16 sm:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-dancing drop-shadow-sm">Our Services</h2>
          <p className="text-white max-w-2xl mx-auto text-lg font-medium shadow-black drop-shadow-md">We offer a wide range of Mehandi designs to make your special moments even more memorable.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map(service => (
            <div key={service.name} className="bg-white bg-opacity-50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2">
              <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                <div className="p-4 bg-orange-100 rounded-full text-brand shadow-inner">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-brand transition-colors duration-300">{service.name}</h3>
              <p className="text-gray-900 text-center leading-relaxed font-medium">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
