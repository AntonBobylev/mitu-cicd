import {useState} from "react";

export default function TaskItem({ task, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleEdit = () => {
        setIsEditing(true);
        setEditText(task.text);
    };

    const handleSave = () => {
        if (editText.trim() === '') {
            handleCancel();

            return;
        }

        onUpdate(task.id, editText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(task.text);
        setIsEditing(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSave();
        } else if (event.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <li className='task-item'>
            { isEditing ? (
                <div className='wrapper'>
                    <input
                        type='text'
                        value={editText}
                        onChange={(event) => setEditText(event.target.value)}
                        onKeyDown={handleKeyPress}
                        className='edit-input'
                        autoFocus
                    />

                    <div className='task-actions'>
                        <button className='save-btn' onClick={handleSave}>💾</button>
                        <button className='cancel-btn' onClick={handleCancel}>❌</button>
                    </div>
                </div>
            ) : (
                <div className='wrapper'>
                    <div className='task-text'>{task.text}</div>
                    <div className='task-actions'>
                        <button className='edit-btn' onClick={() => handleEdit()}>✏️</button>
                        <button className='delete-btn' onClick={() => onDelete(task.id)}>🗑️</button>
                    </div>
                </div>
            ) }
        </li>
    );
}
