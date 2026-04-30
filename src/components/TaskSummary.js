import { useTaskContext } from "../context/TaskContext";

export default function TaskSummary() {
    
    const {state, undoAction} = useTaskContext();
    const total = state.tasks.length;
    const completed = state.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const canUndo = state.history.length > 0;

    return (
        <div className="task-summary">
            <span>Total: {total}</span>
            <span>Completed: {completed}</span>
            <span>Pending: {pending}</span>
            <button onClick={undoAction} disabled = {!canUndo}>Undo</button>
        </div>
    );
}