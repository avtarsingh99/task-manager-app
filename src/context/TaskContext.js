import { createContext, useReducer, useContext } from "react";
import { ACTIONS, taskReducer, initialState } from "../reducer/taskReducer";

// 1. Create the context
const TaskContext = createContext();

// 2. Custom hook for easier usage
export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if(!context) {
        throw new Error ('useTaskContext must be used within TaskProvider');
    }
    return context;
}

// 3. Build the provider component
export const TaskProvider = ({children}) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    const addTask = (taskData) => {
        dispatch({type: ACTIONS.ADD_TASK, payload:taskData});
    };
    const deleteTask = (taskId) => {
        dispatch({type: ACTIONS.DELETE_TASK, payload:taskId});
    };
    const toggleTask = (taskId) => {
        dispatch({type: ACTIONS.TOGGLE_TASK, payload:taskId})
    };
    const editTask = (taskId, updates) => {
        dispatch({type: ACTIONS.EDIT_TASK, payload: {id:taskId, updates}});
    };
    const setFilter = (filter) => {
        dispatch({type: ACTIONS.SET_FILTER, payload: filter});
    };
    const setSearch = (searchTerm) => {
        dispatch({type: ACTIONS.SET_SEARCH, payload: searchTerm});
    };
    const undoAction = () => {
        dispatch({type: ACTIONS.UNDO_ACTION});
    }

    const value = {
        state,
        addTask,
        deleteTask,
        toggleTask,
        editTask,
        setFilter,
        setSearch,
        undoAction
    };


    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}
