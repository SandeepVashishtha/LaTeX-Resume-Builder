// src/components/SplitScreen.js
import React, { useState } from 'react';
import { BlockMath } from 'react-katex'; // Import KaTeX components
import 'katex/dist/katex.min.css'; // Import KaTeX CSS for styling// Make sure this line is present


const SplitScreen = () => {
    const [latexCode, setLatexCode] = useState(''); // State to hold LaTeX code

    const handleChange = (event) => {
        setLatexCode(event.target.value); // Update state on change
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1, padding: '10px' }}>
                <h2>LaTeX Editor</h2>
                <textarea
                    style={{ width: '100%', height: '100%' }}
                    value={latexCode}
                    onChange={handleChange}
                    placeholder="Write your LaTeX code here..."
                />
            </div>
            <div style={{ flex: 1, padding: '10px', borderLeft: '1px solid #ccc' }}>
                <h2>Live Preview</h2>
                <div>
                    {/* Render the LaTeX code */}
                    <div>
                        <BlockMath math={latexCode} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplitScreen;
