import React, { useState } from 'react';
import axios from 'axios';
import '../css/TaskForm.css';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { title, description, status };

        axios.post('http://localhost:8080/api/tasks', newTask)
            .then(response => {
                console.log('Task created:', response.data);
                // Clear form fields after successful submission
                setTitle('');
                setDescription('');
                setStatus('');
            })
            .catch(error => {
                console.error('Error creating task:', error);
            });
    };

    return (
        <div className="task-form-container">
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" required />
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-input" required />
                <label>Status:</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} className="form-input" required />
                <button type="submit" className="submit-button">Create Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
