// backend/routes/latexRoutes.js
const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

router.post('/compile', (req, res) => {
    const { code } = req.body;
    const filePath = path.join(__dirname, 'temp.tex');

    require('fs').writeFileSync(filePath, code);

    exec(`pdflatex -output-directory=${path.dirname(filePath)} ${filePath}`, (error) => {
        if (error) {
            return res.status(500).json({ error: 'Error compiling LaTeX' });
        }

        const pdfFilePath = filePath.replace('.tex', '.pdf');
        res.sendFile(pdfFilePath);
    });
});

module.exports = router;
