import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {taskAPI, TaskStatuses, TaskType} from "../api/task-api";
import {Dispatch} from "redux";

export type TasksActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copy = {...state}
            copy[action.todolistId] = copy[action.todolistId].filter(t => t.id !== action.id)
            return copy
        }
        case 'ADD-TASK': {
            const task: TaskType = {
                id: v1(), title: action.title, status: TaskStatuses.InProgress,
                todoListId: action.todolistId,
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            }
            const copy = {...state}
            copy[action.todolistId] = [task, ...copy[action.todolistId]]
            return copy
        }
        case 'CHANGE-TASK-TITLE': {
            const copy = {...state}
            copy[action.todolistId] = copy[action.todolistId].map(t => t.id === action.id ? {
                ...t,
                title: action.title
            } : t)
            return copy
        }
        case 'CHANGE-TASK-STATUS': {
            const copy = {...state}
            copy[action.todolistId] = copy[action.todolistId].map(t => t.id === action.id ? {
                ...t,
                status: action.status
            } : t)
            return copy
        }
        case "ADD-TODOLIST": {
            const copy = {...state}
            copy[action.id] = []
            return copy
        }
        case "REMOVE-TODOLIST": {
            const copy = {...state}
            delete copy[action.id]
            return copy
        }
        case "SET-TODOLISTS": {
            const copy = {...state}
            action.todolists.forEach(tl => {
                copy[tl.id] = []
            })
            return copy
        }
        case "SET-TASKS": {
            const copy = {...state}
            copy[action.todolistId] = action.tasks
            return copy
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, id: string) => ({type: 'REMOVE-TASK', todolistId, id} as const)

export const addTaskAC = (todolistId: string, title: string) => ({type: 'ADD-TASK', todolistId, title} as const)

export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    id,
    title
} as const)
export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatuses) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId,
    id,
    status
} as const)
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => ({
    type: 'SET-TASKS',
    todolistId,
    tasks
} as const)

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.data.items))
            })
    }
}
