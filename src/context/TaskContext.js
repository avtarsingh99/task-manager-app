import { createContext, useReducer } from "react";
import { ACTIONS, taskReducer, initialState } from "../reducer/taskReducer";

// step 1: Create the context
// step 2: wrap the child element in a provider
// step 3: pass the value in the provider
const TaskContext = createContext();


export const TaskProvider = ({children}) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    const addTask = (taskData) => {
        console.log("Task added !")
        dispatch({type: ACTIONS.ADD_TASK, payload:taskData});
    };
    const deleteTask = (taskId) => {
        console.log("Task deleted !")
        dispatch({type: ACTIONS.DELETE_TASK, payload:taskId});
    };
    const toggleTask = (taskId) => {
        console.log("Task toggled !")
        dispatch({type: ACTIONS.TOGGLE_TASK, payload:taskId})
    };
    const editTask = (taskId, updates) => {
        dispatch({type: ACTIONS.EDIT_TASK, payload: {id:taskId, updates}});
    };
    const setFilter = (filter) => {
        dispatch({type: ACTIONS.SET_FILTER, payload: filter});
    };
    const clearAllTask = () => {
        console.log("All Tasks Cleared !")
        dispatch({type: ACTIONS.CLEAR_ALL_TASKS})
    };
    const undoAction = () => {
        console.log("Undo clicked !")
        dispatch({type: ACTIONS.UNDO_ACTION});
    }

    const value = {
        state,
        addTask,
        deleteTask,
        toggleTask,
        editTask,
        setFilter,
        clearAllTask,
        undoAction
    };


    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}

export {TaskContext}