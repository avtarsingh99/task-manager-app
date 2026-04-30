import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import './TaskItem.css';

export default function TaskItem({ task }) {

    const { toggleTask, deleteTask, editTask } = useTaskContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, seteditData] = useState({

        title: task.title,
        description: task.description,
        priority: task.priority
    });


    function handleEdit() {
        editTask(task.id, editData);
        setIsEditing(false);
    }

    const handleCancel = () => {
        seteditData({
            title: task.title,
            description: task.description,
            priority: task.priority
        });
        setIsEditing(false);
    }


    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return '#ff4757';
            case 'Medium': return '#ffa502';
            case 'Low': return '#26de81';
            default: return '#ddd';
        }
    }

    if (isEditing) {
        return (
                <div className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <div className="task-header">
                        <input
                            value={editData.title}
                            onChange={(e) => seteditData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Task title goes here..."
                        />

                        <select
                            value={editData.priority}
                            onChange={(e) => seteditData(prev => ({ ...prev, priority: e.target.value }))} >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="line"></div>
                    <textarea
                        value={editData.description}
                        onChange={(e) => seteditData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Task description goes here..."
                    />
                    <div className="line"></div>
                    <div className="task-actions">
                        <button className="save-btn" onClick={handleEdit}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
        );
    }


    return (
            <div className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-header">
                    <h3>{task.title}</h3>
                    <span
                        className="priority-badge"
                        style={{ background: getPriorityColor(task.priority) }}
                    >
                        {task.priority}
                    </span>
                </div>
                <div className="line"></div>
                {task.description && <p>{task.description}</p>}
                <div className="line"></div>
                <div className="task-bottom">
                    <div className="task-meta">
                        <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
                    </div>
                    <div className="task-actions">
                        <button onClick={() => toggleTask(task.id)}
                            className={`toggle-btn ${task.completed ? 'completed' : ''}`}>{task.completed ? 'Mark Pending' : 'Mark Completed'}</button>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                </div>
            </div>

    );
}