import {instance, ResponseType} from "./todolist-api";

export enum TaskStatuses {
    InProgress = 0,
    Completed = 1
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string
}
type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

