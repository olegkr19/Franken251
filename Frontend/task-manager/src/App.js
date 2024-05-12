import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/add"  element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
