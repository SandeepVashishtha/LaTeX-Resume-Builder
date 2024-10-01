import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">LaTeX Editor</h1>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="text-lg text-white hover:underline">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/commands" className="text-lg text-white hover:underline">
                            LaTeX Commands
                        </Link>
                    </li>
                    {/* Add more links as needed */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
