import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type TodolistActionType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTitleOfTodolistAC>
    | ReturnType<typeof changeFilterOfTodolistAC>

export const todolistsReducer = (state: Array<TodolistType>, action: TodolistActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id) //filter возвращает отфильтрованный массив
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.id,
                title: action.title,
                filter: 'all'
            }]
        case 'CHANGE-TODOLIST-TITLE': {
            const copy = [...state]
            let todo = copy.find(t => t.id === action.id)
            if (todo) {
                todo.title = action.title
            }
            return copy
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const copy = [...state]
            let todo = copy.find(t => t.id === action.id)
            if (todo) {
                todo.filter = action.filter
            }
            return copy
        }
        default:
            throw new Error(`I don't understand this type`)
    }
}

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, id: v1()} as const)
export const changeTitleOfTodolistAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeFilterOfTodolistAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)