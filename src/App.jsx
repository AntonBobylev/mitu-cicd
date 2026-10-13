import {useState} from "react";

import './App.css';

import TaskInput from "./TaskInput.jsx";
import TaskList from "./TaskList.jsx";

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleAddTask = () => {
        if (inputValue.trim() !== '') {
            setTasks([...tasks, {id: Date.now(), text: inputValue}]);
        }

        setInputValue('');
    }

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    return (
        <div className="App">
            <h1>Мой список дел</h1>
            <TaskInput inputValue={inputValue}
                       setInputValue={setInputValue}
                       onAddTask={handleAddTask} />
            <TaskList tasks={tasks}
                      onDeleteTask={handleDeleteTask}
            />
            <p>Задач: {tasks.length}</p>
        </div>
    );
}

export default App
