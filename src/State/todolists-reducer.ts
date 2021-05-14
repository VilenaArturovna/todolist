import {FilterValuesType, TodolistEntityType} from "../AppWithRedux";
import {Dispatch} from "redux";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: Array<TodolistEntityType> = []

export const todolistsReducer = (state: Array<TodolistEntityType> = initialState, action: TodolistActionType): TodolistEntityType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id) //filter возвращает отфильтрованный массив
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "succeeded"}, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
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

export type TodolistActionType =
    ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeFilterOfTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

//Action Creators
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
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus
} as const)

//Thunk Creators
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const updateTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(id, title))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const deleteTodolistTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(id, 'loading'))
        todolistAPI.deleteTodolist(id)
            .then(() => {
                dispatch(deleteTodolistAC(id))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.addTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}