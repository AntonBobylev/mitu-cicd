import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onDeleteTask }) {
    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task.id}
                          task={task}
                          onDelete={onDeleteTask}
                />
            ))}
        </ul>

    );
}
