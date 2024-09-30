import React, { useState } from 'react';
import Latex from 'react-latex'; // Ensure this import works
import { renderToStaticMarkup } from 'react-dom/server';

const SplitScreen = () => {
    const [latexCode, setLatexCode] = useState(''); // State to hold LaTeX code

    const handleChange = (event) => {
        setLatexCode(event.target.value); // Update state on change
    };

    const handleGeneratePDF = () => {
        fetch('http://localhost:5000/generate-pdf', { // Ensure this matches your backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: latexCode }),
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.pdf'; // Set the desired file name
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => {
            console.error('Error generating PDF:', error);
        });
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
                <button onClick={handleGeneratePDF}>Generate PDF</button> {/* Add this button */}
            </div>
            <div style={{ flex: 1, padding: '10px', borderLeft: '1px solid #ccc' }}>
                <h2>Live Preview</h2>
                <div>
                    <Latex>{latexCode}</Latex> {/* Render the LaTeX code */}
                </div>
            </div>
        </div>
    );
};

export default SplitScreen;
