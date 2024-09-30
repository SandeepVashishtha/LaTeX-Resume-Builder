// server.js
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/generate-pdf', (req, res) => {
    const latexCode = req.body.code;

    const filePath = path.join(__dirname, 'resume.tex');
    const pdfPath = path.join(__dirname, 'resume.pdf');

    // Write the LaTeX code to a .tex file
    fs.writeFileSync(filePath, latexCode);

    // Compile the LaTeX file to PDF
    exec(`pdflatex -interaction=nonstopmode ${filePath}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${stderr}`);
            return res.status(500).send('Error generating PDF');
        }
        res.download(pdfPath, 'resume.pdf', (err) => {
            if (err) {
                console.error('Error downloading file:', err);
            }
            // Optionally delete the generated files after download
            fs.unlinkSync(filePath);
            fs.unlinkSync(pdfPath);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
