// frontend/src/pages/Dashboard.js
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MonacoEditor from '@monaco-editor/react';

const Dashboard = () => {
    const [resumes, setResumes] = useState([]);
    const [currentResume, setCurrentResume] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8080');
        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'UPDATE_RESUME' && message.resume._id === currentResume._id) {
                setCurrentResume({ ...currentResume, content: message.resume.content });
            }
        };

        const fetchResumes = async () => {
            const res = await axios.get('/api/resumes', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setResumes(res.data);
        };
        fetchResumes();
    }, [currentResume]);

    const createResume = async () => {
        const res = await axios.post(
            '/api/resumes',
            { title: 'New Resume', content: '' },
            { headers: { 'x-auth-token': localStorage.getItem('token') } }
        );
        setResumes([...resumes, res.data]);
    };

    const saveResume = async (id, content) => {
        await axios.put(
            `/api/resumes/${id}`,
            { content },
            { headers: { 'x-auth-token': localStorage.getItem('token') } }
        );
        ws.current.send(JSON.stringify({ type: 'UPDATE_RESUME', resume: { _id: id, content } }));
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={createResume}>Create Resume</button>
            <ul>
                {resumes.map((resume) => (
                    <li key={resume._id} onClick={() => setCurrentResume(resume)}>
                        {resume.title}
                    </li>
                ))}
            </ul>
            {currentResume && (
                <MonacoEditor
                    value={currentResume.content}
                    onChange={(value) => {
                        setCurrentResume({ ...currentResume, content: value });
                        saveResume(currentResume._id, value);
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;
