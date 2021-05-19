import {Provider} from "react-redux";
import {RootReducerType, RootStateType} from "../../State/Store";
import React from "react";
import {combineReducers} from "redux";
import {tasksReducer} from "../../State/tasks-reducer";
import {todolistsReducer} from "../../State/todolists-reducer";
import {v1} from "uuid";
import {TaskStatuses} from "../../api/task-api";
import {appReducer} from "../../State/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../../State/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";

const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: RootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'succeeded'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 1, entityStatus: 'succeeded'}
    ] ,
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.InProgress,
                todoListId: 'todolistId1',
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            }],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Bread',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: v1(),
                title: 'Peanut butter',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            }]
    },
    app: {
        status: 'loading',
        error: null,
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
};

const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>
        <HashRouter>
            {storyFn()}
        </HashRouter>
    </Provider>
)