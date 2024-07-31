const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const compileLatex = (fileName, outputPath) => {
    const filePath = path.join(__dirname, fileName);
    
    exec(`pdflatex -output-directory=${path.dirname(outputPath)} ${filePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during LaTeX compilation: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`LaTeX compiler stderr: ${stderr}`);
            return;
        }
        console.log(`LaTeX compiler stdout: ${stdout}`);
        // Optionally, move or rename the generated PDF file
        // fs.renameSync(path.join(__dirname, 'resume.pdf'), outputPath);
    });
};

// Example usage
const latexFileName = 'resume.tex'; // Your LaTeX file name
const outputPath = 'output/resume.pdf'; // Desired output path for the PDF
compileLatex(latexFileName, outputPath);
