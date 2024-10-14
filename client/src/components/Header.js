import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#355E3B] px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="text-black text-xl font-semibold">
          LaTeX Resume Builder
        </div>

        <div className="space-x-4">
          <Link to="/">
            <button
              className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              aria-label="Home"
            >
              Home
            </button>
          </Link>

          <Link to="/commands">
            <button
              className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              aria-label="LaTeX Commands"
            >
              LaTeX Commands
            </button>
          </Link>

          <button
            className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
            aria-label="Download CV"
          >
            Download CV
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
