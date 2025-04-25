import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-800 w-full py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <a href='https://karthikrishna.vercel.app/' className="text-gray-300">© 2024 karthikrishna</a>
        <div className="flex gap-4">
          <a 
            href="https://www.linkedin.com/in/karthikrishnaofficial" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a 
            href="https://instagram.com/i_karthikrishna" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
          >
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 