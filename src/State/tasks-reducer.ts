import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {taskAPI, TaskStatuses, TaskType} from "../api/task-api";
import {Dispatch} from "redux";
import {TasksStateType} from "../AppWithRedux";
import {RootStateType} from "./Store";

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
            const copy = {...state}
            copy[action.task.todoListId] = [action.task, ...copy[action.task.todoListId]]
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
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
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
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.createTask(todolistId, title)
            .then((res) => {
                addTaskAC(res.data.data)
            })
    }
}
export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => RootStateType) => {
        const allTasksFromState = getState().tasks
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)

        if (task) {
            taskAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status
            }).then(() => {
                dispatch(changeTaskStatusAC(todolistId, taskId, status))
            })
        }
    }
}
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => RootStateType) => {
        const allTasksFromState = getState().tasks
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)

        if (task) {
            taskAPI.updateTask(todolistId, taskId, {
                title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }).then(() => {
                dispatch(changeTaskTitleAC(todolistId, taskId, title))
            })
        }
    }
}