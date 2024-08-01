// src/pages/Dashboard.js
import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import katex from 'katex';
import 'katex/dist/katex.min.css';

pdfMake.vfs = pdfFonts.pdfMake.vfs; // Set the fonts for pdfmake

const Dashboard = () => {
    const [latexCode, setLatexCode] = useState('');

    // Function to handle the PDF generation and download
    const handleDownloadPdf = () => {
        const docDefinition = {
            content: [
                {
                    text: latexCode, // Add your LaTeX code here
                    margin: [0, 0, 0, 20]
                }
            ]
        };

        pdfMake.createPdf(docDefinition).download('resume.pdf');
    };

    // Function to render LaTeX code to HTML
    const renderLatex = (code) => {
        try {
            return katex.renderToString(code, { throwOnError: false });
        } catch (e) {
            return '';
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: '10px' }}>
                <h1>LaTeX Editor</h1>
                <MonacoEditor
                    height="80vh"
                    language="latex"
                    value={latexCode}
                    onChange={(value) => setLatexCode(value || '')}
                    theme='vs-dark'
                />
            </div>
            <div style={{ flex: 1, padding: '10px' }}>
                <h1>Preview</h1>
                <div dangerouslySetInnerHTML={{ __html: renderLatex(latexCode) }} />
            </div>
            <button onClick={handleDownloadPdf}>Download PDF</button>
        </div>
    );
};

export default Dashboard;
