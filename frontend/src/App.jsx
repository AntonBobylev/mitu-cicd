import {useEffect, useState} from "react";

import './App.css';

import TaskInput from "./TaskInput.jsx";
import TaskList from "./TaskList.jsx";

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const API_URL = import.meta.env.VITE_API_URL,
          API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        fetch(API_URL, { headers: { 'x-api-key': API_KEY } })
            .then(res => res.json())
            .then(setTasks)
            .catch(err => console.error('Ошибка: ', err));
    }, []);

    const handleAddTask = async () => {
        if (!inputValue.trim()) {
            return;
        }

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
                body: JSON.stringify({ text: inputValue })
            });

            const newTask = await res.json();
            setTasks([...tasks, newTask]);
            setInputValue('');
        } catch (err) {
            console.error('Ошибка при добавлении: ', err);
        }
    }

    const handleDeleteTask = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: { 'x-api-key': API_KEY }
            });

            if (res.ok) {
                setTasks(tasks.filter((task) => task.id !== id));
            }
        } catch (err) {
            console.error('Ошибка при удалении: ', err);
        }
    }

    const handleUpdateTask = async (id, newText) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
                body: JSON.stringify({ text: newText })
            });
            const updated = await response.json();

            setTasks(tasks.map((task) => task.id === id ? { ...task, text: updated.text } : task));
        } catch (err) {
            console.error('Ошибка при обновлении: ', err);
        }
    }

    return (
        <div className="App">
            <h1>Мой список дел</h1>
            <TaskInput inputValue={inputValue}
                       setInputValue={setInputValue}
                       onAddTask={handleAddTask} />
            <TaskList tasks={tasks}
                      onDeleteTask={handleDeleteTask}
                      onUpdateTask={handleUpdateTask}
            />
            <p>Задач: {tasks.length}</p>
        </div>
    );
}

export default App
