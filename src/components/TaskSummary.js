import { useTaskContext } from "../context/TaskContext";

export default function TaskSummary() {

    const { state, undoAction } = useTaskContext();
    const total = state.tasks.length;
    const completed = state.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const canUndo = state.history.length > 0;

    return (
        <div className="task-summary">
            <div className="stat-box">
                <strong>{total}</strong>
                <small>Total</small>
            </div>
            <div className="stat-box">
                <strong>{completed}</strong>
                <small>Completed</small>
            </div>
            <div className="stat-box">
                <strong>{pending}</strong>
                <small>Pending</small>
            </div>
            <button
                className={`undo-btn ${!canUndo ? 'disabled' : ''}`}
                onClick={undoAction}
                disabled={!canUndo}>
                ↩ Undo
            </button>
        </div>
    );
}