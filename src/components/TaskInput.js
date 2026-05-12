import { useContext, useState } from 'react'
import { TaskContext } from '../context/TaskContext'

const TaskInput = () => {

    const { addTask } = useContext(TaskContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState("Medium")

    function handleClick() {
        if (!title.trim() || !description.trim()) return;
        addTask({ title, description, priority })
        setTitle('')
        setDescription('')
        setPriority('Medium')
    }

    return (
        <div className='task-input-card'>
            <div className='inputs'>
                <label>Title:</label>
                <input
                    type='text'
                    placeholder='Enter title here'
                    value={title}
                    onChange={e => setTitle(e.target.value)} />
                <label>Description:</label>
                <input
                    type='text'
                    placeholder='Enter description here'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label>Priority:</label>
                <select value={priority} onChange={e => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div className='button-section'>
                <button className={`${!title || !description ? 'undo-btn disabled' : ''}`} onClick={handleClick} >Add Task</button>
            </div>
        </div>
    )
}

export default TaskInput
