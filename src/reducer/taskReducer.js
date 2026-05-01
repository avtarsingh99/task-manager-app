
// Starting date when app first loads
export const initialState = {
    tasks: [
        {
            id: 1,
            title: 'React Introduction',
            description: 'Get started with basic react concepts.',
            completed: false,
            priority: 'High',
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            title: 'Get Started with React Hooks',
            description: 'In this, you will learn about the react hooks.',
            completed: false,
            priority: 'Medium',
            createdAt: new Date().toISOString()
        }
    ],
    filter: 'all',
    searchTerm: '',
    history: [] 
};

export const ACTIONS = {
    ADD_TASK: "ADD_TASK",
    DELETE_TASK: "DELETE_TASK",
    TOGGLE_TASK: "TOGGLE_TASK",
    EDIT_TASK: "EDIT_TASK",
    SET_FILTER: "SET_FILTER",
    SET_SEARCH: "SET_SEARCH",
    UNDO_ACTION: "UNDO_ACTION"
};

export const taskReducer = (state, action) => {

    // save current state to history before making any changes
    const saveToHistory =  (currentState) => ({
        ...currentState,
        history: [currentState, ...currentState.history.slice(0,9)]
    });


    switch (action.type) {
        case ACTIONS.ADD_TASK:
            const newTask = {
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description,
                completed: false,
                priority: action.payload.priority || "Medium",
                createdAt: new Date().toISOString()
            };

            return saveToHistory({
                ...state,
                tasks: [...state.tasks, newTask]
            });

        case ACTIONS.DELETE_TASK: 
            return saveToHistory({
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            });
            
        case ACTIONS.TOGGLE_TASK:
            return saveToHistory({
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload? {...task, completed: !task.completed}:task
                )
            });

        case ACTIONS.EDIT_TASK:
            return saveToHistory({
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id? {...task, ...action.payload.updates}: task
                )
            });

        case ACTIONS.SET_FILTER:
            return {
                ...state,
                filter: action.payload
            };

        case ACTIONS.SET_SEARCH:
            return {
                ...state,
                searchTerm: action.payload
            };

        case ACTIONS.UNDO_ACTION:
            if(state.history.length > 0){
                const [previousState, ...restHistory] = state.history;
                return {
                    ...previousState,
                    history: restHistory
                };
            }
            return state;

    
        default:
            throw new Error (`Unhandled action type: ${action.type}`);
    }

}; 