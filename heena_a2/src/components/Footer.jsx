import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand text-white p-4 sm:p-6">
      <div className="container mx-auto text-center">
        <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Heena by Anshu. All Rights Reserved.</p>
        {/* Add social media links here later */}
      </div>
    </footer>
  );
};

export default Footer;
