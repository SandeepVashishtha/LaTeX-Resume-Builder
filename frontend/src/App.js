import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LaTeXEditor from './pages/LaTeXEditor'; // Import the new component

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/latex-editor" element={<LaTeXEditor />} /> {/* Add route */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
