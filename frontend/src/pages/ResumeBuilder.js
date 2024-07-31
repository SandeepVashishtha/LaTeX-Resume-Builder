// src/pages/ResumeBuilder.js
import React, { useState } from 'react';
import axios from 'axios';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({ name: '', email: '', skills: '' });

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/api/resumes', resumeData);
      alert('Resume saved successfully');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Error saving resume');
    }
  };

  return (
    <div>
      <h1>Resume Builder</h1>
      <input type="text" name="name" value={resumeData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="email" value={resumeData.email} onChange={handleChange} placeholder="Email" />
      <textarea name="skills" value={resumeData.skills} onChange={handleChange} placeholder="Skills" />
      <button onClick={handleSave}>Save Resume</button>
    </div>
  );
};

export default ResumeBuilder;
