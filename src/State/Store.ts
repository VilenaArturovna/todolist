import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer,
        app: appReducer
    }
)

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store