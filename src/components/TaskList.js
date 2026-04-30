import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {

    const { state } = useTaskContext();

    const filtered = state.tasks.filter(task => {

        const matchesFilter = 
        state.filter === 'all' ||
        (state.filter === 'completed' && task.completed) || 
        (state.filter === 'pending' && !task.completed);

        const matchesSearch = 
        state.searchTerm === '' ||
        task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(state.searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
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