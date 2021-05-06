import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store