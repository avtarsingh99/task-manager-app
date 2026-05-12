import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export default function TaskItem({ task }) {

    const { toggleTask, deleteTask, editTask } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [editData, seteditData] = useState({

        title: task.title,
        description: task.description,
        priority: task.priority
    });


    function handleEdit() {
        if (!editData.title.trim() || !editData.description.trim()) {
            alert("Title & Description can't be empty !!!")
        } else {
            editTask(task.id, editData);
            setIsEditing(false);
        }
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
            case 'High': return 'red';
            case 'Medium': return 'orange';
            case 'Low': return 'green';
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
            <p>{task.description}</p>
            <div className="line"></div>
            <div className="task-bottom">
                <div className="task-meta">
                    <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="task-actions">
                    <button onClick={() => toggleTask(task.id)}
                        className={`toggle-btn ${task.completed ? 'completed' : ''}`}>{task.completed ? 'Mark Pending' : 'Mark Completed'}</button>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    {!showConfirmation && <button onClick={() => setShowConfirmation(true)}>Delete</button>}
                </div>
            </div>
            {showConfirmation && (
                <>
                    <div className="blurr-bg" onClick={() => setShowConfirmation(false)}></div>

                    <div className="modal-content">
                        <div className="header-content">
                            <div className="title">
                                <h3>Delete Task</h3>
                                <button onClick={() => setShowConfirmation(false)}>x</button>
                            </div>
                            <p>Are you sure you want to delete this task?</p>
                        </div>
                        <div className="confirm-btns">
                            <button onClick={() => {
                                deleteTask(task.id);
                                setShowConfirmation(false);
                            }}>Yes, Delete</button>
                            <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                        </div>
                    </div>
                </>
            )}
        </div>

    );
}