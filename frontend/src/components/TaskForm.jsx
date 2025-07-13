import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


 export default function TaskForm({ onAddTask }) {
  
  const [name, setName] = useState('');
const [desc, setDesc] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !desc.trim()) return;

    onAddTask(name.trim(), desc.trim());
    setName('');
    setDesc('');
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter task name"
        className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
  value={desc}
  onChange={(e) => setDesc(e.target.value)}
  placeholder="Enter description"
/>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        ➕ Add Task
      </button>
    </form>
  );
}

