import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers, createStore} from "redux";

const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)

export const store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store