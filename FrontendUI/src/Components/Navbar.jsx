import React, { useState } from 'react';
import LogoM from '../assets/images/LogoM.png'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white px-6 py-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <img src={LogoM} alt="Logo" className="w-10 h-10 object-contain" />
          {/* <span className="text-2xl font-bold text-gray-900">
            EvenTers
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">.</span>
          </span> */}
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-lg font-medium text-gray-800">
          {["Home", "Services", "Contacts", "Events", "About Us"].map((item, index) => (
            <li key={index} className="relative group cursor-pointer">
              <span className="hover:text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                {item}
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-pink-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-3 text-lg font-medium text-gray-800 text-center">
          {["Home", "Services", "Contacts", "Events", "About Us"].map((item, index) => (
            <li key={index}>
              <span className="block hover:text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
