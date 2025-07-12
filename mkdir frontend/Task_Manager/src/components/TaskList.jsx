import TaskItem from './TaskItem';


export default function TaskList({ tasks, onDelete, onToggle, onEdit, filter }) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.done;
    if (filter === 'completed') return task.done;
    return true;
  });

  return (
    <ul className="mt-6">
      {filteredTasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}