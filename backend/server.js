const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

app.post('/api/compile-latex', (req, res) => {
    const { latexCode } = req.body;
    const inputFile = 'input.tex'; // Temporary LaTeX file
    const outputFile = 'output/resume.pdf'; // Output PDF file

    // Save the LaTeX code to a file
    fs.writeFileSync(path.join(__dirname, inputFile), latexCode);

    exec(`pdflatex -output-directory=${path.dirname(outputFile)} ${path.join(__dirname, inputFile)}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during LaTeX compilation: ${error.message}`);
            return res.status(500).send('LaTeX compilation failed');
        }
        if (stderr) {
            console.error(`LaTeX compiler stderr: ${stderr}`);
            return res.status(500).send('LaTeX compilation failed');
        }
        res.json({ pdfUrl: `/output/${path.basename(outputFile)}` });
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});

app.use('/output', express.static(path.join(__dirname, 'output')));
