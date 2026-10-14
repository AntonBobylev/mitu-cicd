export default function TaskInput({ inputValue, setInputValue, onAddTask }) {
    return (
        <div className="input-container">
            <input type="text"
                   placeholder='Введите задачу...'
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
            />

            <button onClick={onAddTask}>Добавить</button>
        </div>
    );
}
