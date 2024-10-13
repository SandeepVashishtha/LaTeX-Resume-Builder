import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#355E3B] px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="text-black text-xl font-semibold">
          LaTeX Resume Builder
        </div>

        {/* Right side: Buttons */}
        <div className="space-x-4">
          <button className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
            Home
          </button>

          <button className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
            LaTeX Commands
          </button>
          <button className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
            Download CV
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
