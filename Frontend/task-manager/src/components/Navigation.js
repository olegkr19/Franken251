import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/tasks/add" className="nav-link">Add Task</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;