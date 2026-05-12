import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { useContext } from "react";

export default function TaskList() {

    const { state } = useContext(TaskContext);

    const filtered = state.tasks.filter(task => {

        const matchesFilter = 
        state.filter === 'all' ||
        (state.filter === 'completed' && task.completed) || 
        (state.filter === 'pending' && !task.completed);

        return matchesFilter;
    });

    if (filtered.length === 0)
        return <p className="empty">No Tasks Found.</p>;

    return (
        <div className="task-list">
            {filtered.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}