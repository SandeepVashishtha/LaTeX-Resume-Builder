import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';

const LaTeXEditor = () => {
  const [content, setContent] = useState('');

  const handleEditorChange = (value) => {
    setContent(value);
  };

  return (
    <div>
      <Editor
        height="90vh"
        language="latex"
        theme="vs-dark"
        value={content}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default LaTeXEditor;
