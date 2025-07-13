import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TaskItem({ task, index, onDelete, onToggle, onEdit }) {

const [isEditing, setIsEditing] = useState(false);
const [editedName, setEditedName] = useState(task.task_name);
const [editedDesc, setEditedDesc] = useState(task.description);

function handleSave() {
  onEdit(index, editedName, editedDesc);
  setIsEditing(false);
}


  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-3 hover:shadow-lg"
    >
      <div className="flex items-center gap-3 mb-2 sm:mb-0">
        <input
          type="checkbox"
          checked={task.status==='done'}
          onChange={() => onToggle(index)}
          className="w-4 h-4 text-blue-600 rounded"
        />
        {isEditing ? (
  <div className="flex flex-col gap-1">
    <input
      value={editedName}
      onChange={(e) => setEditedName(e.target.value)}
      className="border px-2 py-1 rounded"
    />
    <textarea
      value={editedDesc}
      onChange={(e) => setEditedDesc(e.target.value)}
      className="border px-2 py-1 rounded"
    />
  </div>
        ) : (
      
      <div className="flex flex-col gap-1">
    <span className={`text-lg font-semibold ${task.status === 'done' ? 'line-through text-gray-400' : 'text-black'}`}>
      {task.task_name}
    </span>
    <p className="text-sm text-gray-500">{task.description}</p>
    <p className="text-xs text-blue-500">Status: {task.status}</p>
  </div>


        )}
      </div>
      <div className="flex gap-2 justify-end">
       {isEditing ? (
  <button
    onClick={handleSave}
    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
  >
    💾 Save
  </button>
        ) : (
          <button
    onClick={() => setIsEditing(true)}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
  >
    ✏️ Edit
  </button>
        )}
        <button
          onClick={() => onDelete(index)}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
        >
          ❌ Delete
        </button>
      </div>
    </motion.li>
  );
}
