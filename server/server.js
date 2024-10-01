const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    origin: ['http://localhost:3000', 'https://latex-resume-builder.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.post('/generate-pdf', (req, res) => {
    const latexCode = req.body.latex;

    const filePath = path.join(__dirname, 'resume.tex');
    const pdfPath = path.join(__dirname, 'resume.pdf');
    fs.writeFileSync(filePath, latexCode);
    exec(`pdflatex -interaction=nonstopmode ${filePath}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${stderr}`);
            return res.status(500).send('Error generating PDF');
        }
        if (!fs.existsSync(pdfPath)) {
            return res.status(500).send('PDF not generated');
        }
        res.download(pdfPath, 'resume.pdf', (err) => {
            if (err) {
                console.error('Error downloading file:', err);
            }
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting .tex file:', err);
            });
            fs.unlink(pdfPath, (err) => {
                if (err) console.error('Error deleting .pdf file:', err);
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
