// frontend/src/components/Navbar.js
import React from 'react';

const Navbar = () => {
    return (
        <nav>
            <h1>LaTeX Resume Builder</h1>
            <ul>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Sign Up</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
