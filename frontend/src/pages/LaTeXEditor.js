import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const LaTeXEditor = () => {
    const [latexCode, setLatexCode] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');

    const compileLatex = async () => {
        try {
            const response = await axios.post('/api/compile-latex', { latexCode });
            const { pdfUrl } = response.data;
            setPdfUrl(pdfUrl);
        } catch (error) {
            console.error('Error compiling LaTeX:', error);
        }
    };

    const downloadPdf = () => {
        if (pdfUrl) {
            saveAs(pdfUrl, 'resume.pdf');
        }
    };

    return (
        <div>
            <textarea
                value={latexCode}
                onChange={(e) => setLatexCode(e.target.value)}
                rows="10"
                cols="50"
            />
            <button onClick={compileLatex}>Compile LaTeX</button>
            {pdfUrl && (
                <div>
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
                    <button onClick={downloadPdf}>Download PDF</button>
                </div>
            )}
        </div>
    );
};

export default LaTeXEditor;
