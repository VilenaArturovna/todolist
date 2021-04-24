import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

export type TasksActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copy = {...state}
            copy[action.todolistId] = copy[action.todolistId].filter(t => t.id !== action.id)
            return copy
        }
        case 'ADD-TASK': {
            const task: TaskType = {id: v1(), title: action.title, isDone: false}
            const copy = {...state}
            copy[action.todolistId] = [task, ...copy[action.todolistId]]
            return copy
        }
        case 'CHANGE-TASK-TITLE': {
            const copy = {...state}
            copy[action.todolistId] = copy[action.todolistId].map(t => {return {...t}}) //именно так копируются таски в асс. массиве
            let task = [...copy[action.todolistId]].find(t => t.id === action.id)
            if (task) {
                task.title = action.title
            }
            return copy
        }
        case 'CHANGE-TASK-STATUS': {
            const copy = {...state}
            copy[action.todolistId] = copy[action.todolistId].map(t => {return {...t}})
            let task = copy[action.todolistId].find(t => t.id === action.id)
            if (task) {
                task.isDone = action.isDone
            }
            return copy
        }
        case "ADD-TODOLIST": {
            const copy = {...state}
            copy[action.id] = []
            return copy
        }
        case "REMOVE-TODOLIST":{
            const copy = {...state}
            delete copy[action.id]
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
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId,
    id,
    isDone
} as const)