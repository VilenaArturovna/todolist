import {addTodolistAC, deleteTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {taskAPI, TaskType, UpdateTaskModelType} from "../api/task-api";
import {Dispatch} from "redux";
import {TasksStateType} from "../AppWithRedux";
import {RootStateType} from "./Store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copy = {...state}
            copy[action.todolistId] = copy[action.todolistId].filter(t => t.id !== action.id)
            return copy
        }
        case 'ADD-TASK': {
            const copy = {...state}
            copy[action.task.todoListId] = [action.task, ...copy[action.task.todoListId]]
            return copy
        }
        case 'UPDATE-TASK': {
            const copy = {...state}
            copy[action.todolistId] = copy[action.todolistId].map(t => t.id === action.id ? {
                ...t,
                ...action.model
            } : t)
            return copy
        }
        case "ADD-TODOLIST": {
            const copy = {...state}
            copy[action.todolist.id] = []
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

export type TasksActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>

//Action Creators
export const removeTaskAC = (todolistId: string, id: string) => ({type: 'REMOVE-TASK', todolistId, id} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (todolistId: string, id: string, model: UpdateDomainTaskModelType) => ({
    type: 'UPDATE-TASK', todolistId, id, model
} as const)
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => ({
    type: 'SET-TASKS', todolistId, tasks
} as const)


//Thunk Creators
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        taskAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.data.items))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        taskAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        taskAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
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

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => RootStateType) => {
        const allTasksFromState = getState().tasks
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)

        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }
            dispatch(setAppStatusAC('loading'))
            taskAPI.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(todolistId, taskId, domainModel))
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
}
