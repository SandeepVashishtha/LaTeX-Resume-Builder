import React from 'react';
import { Editor } from '@monaco-editor/react';

function LaTeXEditor({ latexCode, setLatexCode }) {
  const handleChange = (value) => {
    console.log('Editor value changed:', value); // Debug log
    setLatexCode(value || ''); // Ensure value is a string
  };

  return (
    <div className="editor-container">
      <Editor
        value={latexCode}
        onChange={handleChange}
        language="latex"
        theme="dark"
        options={{
          minimap: { enabled: false },
          wordWrap: 'on',
        }}
      />
    </div>
  );
}



export default LaTeXEditor;
