import {addTodolistTC, deleteTodolistTC, fetchTodolistsTC} from "./todolists-reducer";
import {taskAPI, UpdateTaskModelType} from "../api/task-api";
import {TasksStateType} from "../AppWithRedux";
import {RootStateType} from "./Store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await taskAPI.getTasks(todolistId)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolistId, tasks: res.data.items}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})
export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        await taskAPI.deleteTask(param.todolistId, param.taskId)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolistId: param.todolistId, id: param.taskId}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})
export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todolistId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await taskAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})
export const updateTaskTC = createAsyncThunk('tasks/updateTask',
    async (param: { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, thunkAPI) => {
        const state = thunkAPI.getState() as RootStateType
        const allTasksFromState: TasksStateType = state.tasks
        const tasksForCurrentTodolist = allTasksFromState[param.todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === param.taskId)

        if (!task) thunkAPI.rejectWithValue('Task not found at the state')

        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...param.domainModel
            }
            thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
            const res = await taskAPI.updateTask(param.todolistId, param.taskId, apiModel)
            try {
                if (res.data.resultCode === 0) {
                    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                    return ({
                        todolistId: param.todolistId,
                        id: param.taskId,
                        model: param.domainModel
                    })
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue({})
                }
            } catch (error) {
                handleServerNetworkError(error, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({})
            }
        }
    }
)

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload]
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            if (action.payload) state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.id)
                if (index > -1) state[action.payload.todolistId].splice(index, 1)
            }
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        });
        builder.addCase(updateTaskTC.fulfilled, (state, {payload}) => {
            if (payload) {
            const tasks = state[payload.todolistId]
            const index = tasks.findIndex(t => t.id === payload.id)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...payload.model}
            }}
        })
    }
})

export const tasksReducer = slice.reducer


//Thunk Creators


