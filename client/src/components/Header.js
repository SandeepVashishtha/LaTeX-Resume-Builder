import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Ensure react-icons/fi is installed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-[#355E3B] to-[#2C5F2D] px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold tracking-wide">
          LaTeX Resume Builder
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <FiX className="text-white text-3xl" />
            ) : (
              <FiMenu className="text-white text-3xl" />
            )}
          </button>
        </div>

        {/* Navigation links (hidden on mobile, visible on desktop) */}
        <div className="hidden md:flex space-x-6">
          <Link to="/">
            <button
              className="bg-white text-black px-5 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-[#f3e8e3] hover:scale-105"
              aria-label="Home"
            >
              Home
            </button>
          </Link>

          <Link to="/commands">
            <button
              className="bg-white text-black px-5 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-[#f3e8e3] hover:scale-105"
              aria-label="LaTeX Commands"
            >
              LaTeX Commands
            </button>
          </Link>

          <button
            className="bg-white text-black px-5 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-[#f3e8e3] hover:scale-105"
            aria-label="Download CV"
          >
            Download CV
          </button>
        </div>
      </div>

      {/* Mobile menu (visible on mobile only) */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link to="/" onClick={toggleMenu}>
            <button
              className="block w-full bg-white text-black px-5 py-3 rounded-lg text-center transition-all duration-300 ease-in-out transform hover:bg-[#f3e8e3]"
              aria-label="Home"
            >
              Home
            </button>
          </Link>

          <Link to="/commands" onClick={toggleMenu}>
            <button
              className="block w-full bg-white text-black px-5 py-3 rounded-lg text-center transition-all duration-300 ease-in-out transform hover:bg-[#f3e8e3]"
              aria-label="LaTeX Commands"
            >
              LaTeX Commands
            </button>
          </Link>

          <button
            className="block w-full bg-white text-black px-5 py-3 rounded-lg text-center transition-all duration-300 ease-in-out transform hover:bg-[#f3e8e3]"
            aria-label="Download CV"
          >
            Download CV
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
