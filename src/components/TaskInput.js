import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import './TaskInput.css'

export default function TaskInput() {

    const { addTask } = useTaskContext();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('Medium')


    function handleSumbit() {
        if (!title.trim()) return;
        addTask({ title, description: desc, priority });
        setTitle('');
        setDesc('');
        setPriority('Medium');
    }


    return (
        <div className="task-input">
            <h3>Add Task</h3>
            <div className="task-title">
                <label>Title:</label>
                <input value={title} onChange={e => setTitle(e.target.value)}
                    placeholder="Task title...." />
            </div>
            <div className="task-desc">
                <label>Description:</label>
                <input value={desc} onChange={e => setDesc(e.target.value)}
                    placeholder="Description here..." />
            </div>
            <div className="task-priority">
                <label>Priority:</label>
                <select value={priority} onChange={e => setPriority(e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <button  className="add-task-btn" onClick={handleSumbit} disabled={title === '' || desc === ''}>Add Task</button>
        </div>
    );
}