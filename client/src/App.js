import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplitScreen from './components/SplitScreen';
import Navbar from './components/Header';
import LaTeXCommands from './pages/Commands';
import Footer from './components/Footer';
import './index.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <main> {/* Use main to wrap the Routes */}
                    <Routes>
                        <Route path="/" element={<SplitScreen />} /> {/* Home page */}
                        <Route path="/commands" element={<LaTeXCommands />} /> {/* LaTeX Commands page */}
                        {/* Add more routes as you need later */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
