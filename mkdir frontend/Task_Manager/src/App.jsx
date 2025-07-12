import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from 'axios';


export default function App() {
 const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  

// ✅ Apply dark mode class to HTML tag
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);

  
 useEffect(() => {
  axios.get('http://localhost:8080/task/getAllTasks')
    .then(res => setTasks(res.data))
    .catch(err => console.error("Failed to load tasks", err));
}, []);

//GetAlltask
  function handleAddTask(taskName, desc) {
  axios.post('http://localhost:8080/task/addTask', {
    task_name: taskName,
    description: desc,
    completed: false,
    status: 'pending'
  })
  .then(res => setTasks([...tasks, res.data]))
  .catch(err => console.error("Error adding task:", err));
}

//Delete
 function handleDelete(index) {
  const task = tasks[index];
  axios.delete(`http://localhost:8080/task/deletetask/${task.id}`)
    .then(() => {
      setTasks(tasks.filter((_, i) => i !== index));
    })
    .catch(err => console.error("Delete error:", err));
}

//Toggle
function handleToggle(index) {
  const task = tasks[index];
  const newStatus = task.status === 'pending' ? 'done' : 'pending';

  axios.put(`http://localhost:8080/task/status/${task.id}`, {
    status: newStatus
  })
  .then(() => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
  })
  .catch(err => console.error("Error updating status:", err));
}


  function handleEdit(index, newName, newDesc) {
  const task = tasks[index];

  axios.put(`http://localhost:8080/task/updatetask/${task.id}`, {
    ...task,
    task_name: newName,
    description: newDesc
  })
  .then((res) => {
    const updated = [...tasks];
    updated[index] = res.data;
    setTasks(updated);
  })
  .catch((err) => console.error("Error updating task:", err));
}








  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-center justify-center p-4">      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl px-6 py-8"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 text-center sm:text-left">
            📝 Task Manager
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-3 sm:mt-0 text-sm px-4 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded shadow"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-300 text-sm mb-4">
          Organize your day, track your progress, and stay productive.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {['all', 'active', 'completed'].map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                filter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

       <TaskForm onAddTask={handleAddTask}/>

        <div className="mt-8">
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEdit}
            filter={filter}
          />
        </div>
      </motion.div>
    </div>
  );
}
