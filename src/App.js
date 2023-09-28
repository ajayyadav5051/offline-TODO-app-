import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    if (e.key === 'Enter' && task) {
      const newTask = { text: task, completed: false, timestamp: Date.now() };
      setTasks([newTask, ...tasks]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    newTasks[index].timestamp = Date.now();
    setTasks(newTasks.sort((a, b) => b.timestamp - a.timestamp));
  };

  const resetTasks = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      <h1>Offline TODO App</h1>
      <div className="control-panel">
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={addTask}
          placeholder="Enter task and press Enter..."
        />
        <button className="reset-btn" onClick={resetTasks}>Reset</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li 
            key={index} 
            onClick={() => toggleTaskCompletion(index)}
            className={task.completed ? 'completed' : ''}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
