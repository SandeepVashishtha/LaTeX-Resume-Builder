  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import LaTeXEditor from './components/LaTeXEditor';
  import ResumePreview from './components/ResumePreview';
  import Header from './components/Header';
  import './styles/App.css';
  import { API_URL } from './config';

  function App() {
    const [latexCode, setLatexCode] = useState('');

    useEffect(() => {
      // Load resume data on component mount
      axios.get(`${API_URL}/get/latest`)
        .then(response => setLatexCode(response.data.latexCode))
        .catch(error => console.error('Error fetching resume:', error));
    }, []);

    const saveResume = () => {
      axios.post(`${API_URL}/save`, { latexCode })
        .then(response => alert('Resume saved!'))
        .catch(error => console.error('Error saving resume:', error));
    };
    return (
      <div className="App">
        <Header />
        <div className="content">
          <LaTeXEditor latexCode={latexCode} setLatexCode={setLatexCode} />
          <ResumePreview latexCode={latexCode} />
        </div>
        <button onClick={saveResume}>Save Resume</button>
      </div>
    );
  }

  export default App;
