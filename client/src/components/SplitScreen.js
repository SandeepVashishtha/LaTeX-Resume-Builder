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
        <div className="flex flex-col lg:flex-row h-screen">
            {/* LaTeX Editor Section */}
            <div className="flex-1 p-4 overflow-y-auto">
                <h2 className="text-2xl font-semibold text-[#355E3B] mb-4">LaTeX Editor</h2>
                <textarea
                    className="w-full h-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#355E3B] resize-none transition-all duration-300 ease-in-out shadow-md"
                    value={latexCode}
                    onChange={handleInputChange}
                    placeholder="Enter your LaTeX code here..."
                />
            </div>

            {/* Live Preview Section */}
            <div className="flex-1 p-4 border-t-2 border-gray-200 lg:border-l-2 lg:border-t-0 overflow-y-auto">
                <h2 className="text-2xl font-semibold text-[#355E3B] mb-4">Live Preview</h2>
                <div className="latex-preview p-4 border-2 border-gray-300 bg-gray-100 rounded-lg h-full overflow-hidden whitespace-normal break-words shadow-md transition-all">
                    <BlockMath>{latexCode}</BlockMath>
                </div>
                <button
                    onClick={generatePDF}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-[#1E90FF] to-[#00BFFF] text-white font-medium rounded-lg hover:bg-gradient-to-r hover:from-[#00BFFF] hover:to-[#1E90FF] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );

};



export default SplitScreen;
