import {v1} from "uuid";
import {FilterValuesType, TodolistEntityType} from "../AppWithRedux";
import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";

export type TodolistActionType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTitleOfTodolistAC>
    | ReturnType<typeof changeFilterOfTodolistAC>
    | ReturnType<typeof setTodolistsAC>

const initialState: Array<TodolistEntityType> = []

export const todolistsReducer = (state: Array<TodolistEntityType> = initialState, action: TodolistActionType): TodolistEntityType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id) //filter возвращает отфильтрованный массив
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.id,
                title: action.title,
                filter: 'all',
                order: 0,
                addedDate: ''
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
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({
                ...tl,
                filter: "all"
            }))
        }
        default:
            return state
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
export const setTodolistsAC = (todolists: Array<TodolistEntityType>) => ({type: "SET-TODOLISTS", todolists} as const)

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
    }
}