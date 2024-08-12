import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function ResumePreview({ latexCode }) {
  return (
    <div className="preview-container">
      <BlockMath>{latexCode}</BlockMath>
    </div>
  );
}

export default ResumePreview;
