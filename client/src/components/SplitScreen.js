import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import katex from 'katex';

const SplitScreen = () => {
    const [latexCode, setLatexCode] = useState('');

    const handleInputChange = (event) => {
        setLatexCode(event.target.value);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const element = document.createElement('div');
        element.style.width = '100%';
        element.style.margin = '20px';

        // Render LaTeX to HTML using KaTeX
        try {
            const renderedHTML = katex.renderToString(latexCode, {
                throwOnError: false,
            });
            element.innerHTML = renderedHTML;

            // Add HTML content to PDF
            doc.html(element, {
                callback: () => {
                    doc.save('resume.pdf');
                },
                x: 10,
                y: 10,
            });
        } catch (error) {
            console.error("Error rendering LaTeX:", error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="flex-1 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-2">LaTeX Editor</h2>
                <textarea
                    className="w-full h-full p-2 border rounded resize-none overflow-hidden"
                    value={latexCode}
                    onChange={handleInputChange}
                    placeholder="Enter your LaTeX code here..."
                />
            </div>
            
            <div className="flex-1 p-4 border-r overflow-y-auto">
                <h2 className="text-xl font-bold mb-2">Live Preview</h2>
                <div className="latex-preview p-4 border rounded h-full overflow-hidden whitespace-normal break-words">
                    <BlockMath>{latexCode}</BlockMath>
                </div>
                <button
                    onClick={generatePDF}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default SplitScreen;
