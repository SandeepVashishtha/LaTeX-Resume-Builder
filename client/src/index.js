import React from 'react';
import ReactDOM from 'react-dom/client'; // Change from ReactDOM.render to ReactDOM.createRoot for React 18
import App from './App';
import './styles/index.css'; // Import global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
