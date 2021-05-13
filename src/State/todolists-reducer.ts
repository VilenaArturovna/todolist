import {FilterValuesType, TodolistEntityType} from "../AppWithRedux";
import {Dispatch} from "redux";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {setAppStatusAC} from "./app-reducer";

export type TodolistActionType =
    ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeFilterOfTodolistAC>
    | ReturnType<typeof setTodolistsAC>

const initialState: Array<TodolistEntityType> = []

export const todolistsReducer = (state: Array<TodolistEntityType> = initialState, action: TodolistActionType): TodolistEntityType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id) //filter возвращает отфильтрованный массив
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "succeeded"}, ...state]
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
                filter: "all",
                entityStatus: "succeeded"
            }))
        }
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeFilterOfTodolistAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const updateTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodolist(id, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const deleteTodolistTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.deleteTodolist(id)
            .then(() => {
                dispatch(deleteTodolistAC(id))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.addTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}