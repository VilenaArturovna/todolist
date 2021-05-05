import {Provider} from "react-redux";
import {RootStateType} from "../../State/Store";
import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../State/tasks-reducer";
import {todolistsReducer} from "../../State/todolists-reducer";
import {v1} from "uuid";
import {TaskStatuses} from "../../api/task-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 1}
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
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>
        {storyFn()}
    </Provider>
)