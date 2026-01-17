import React from 'react';
import ImageLoader from './ImageLoader';

const About = () => {
  return (
    <section className="py-16 sm:py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          <div className="w-full md:w-1/2 relative flex justify-center md:justify-end">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

            <div className="relative">
              <div className="absolute inset-0 border-2 border-white/60 rounded-full transform rotate-6 scale-105 opacity-50"></div>
              <ImageLoader
                src="/aa2.png"
                alt="Heena by Anshu"
                className="relative w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-full shadow-2xl z-10 border-4 border-white/80"
                loaderSize="large"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left bg-white bg-opacity-50 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
            <div className="inline-block py-1 px-3 rounded-full bg-brand/10 text-brand text-sm font-bold mb-4 tracking-wide uppercase">
              The Artist
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-dancing">
              About <span className="text-brand">Heena by Anshu</span>
            </h2>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed font-medium">
              I am a passionate and skilled Mehandi artist with years of experience in creating stunning and unique designs. My expertise ranges from traditional bridal Mehandi to modern and contemporary patterns.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed font-medium">
              I am dedicated to making your special occasions even more memorable with the art of Heena. Every design is a masterpiece, crafted with love and precision to reflect your unique personality.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

