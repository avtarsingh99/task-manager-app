import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";

export default function TaskSummary() {

    const { state, undoAction, clearAllTask } = useContext(TaskContext);
    const total = state.tasks.length;
    const completed = state.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const canUndo = state.history.length > 0;

    return (
        <div className="task-summary">
            <div className="stat-count">
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
            </div>
            <div className="undo-and-clear-btns">
                <button
                    className={`undo-btn ${!canUndo ? 'disabled' : ''}`}
                    onClick={undoAction}
                    disabled={!canUndo}>
                    ↩ Undo
                </button>
                <button
                    className={`clear-btn ${total === 0 ? 'disabled-clear' : ''}`}
                    onClick={clearAllTask}
                    disabled={total === 0}>
                    Clear All Tasks</button>
            </div>
        </div>
    );
}