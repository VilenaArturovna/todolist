import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '2f8b88ce-de54-4bd6-9153-b38ec847d28e'
    }
})

export type ResponseType<D = {}> = { //если не передавать D, то будет пустым объектом
    resultCode: number
    messages: Array<string>
    data: D
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>(`/todo-lists/`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`/todo-lists/`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title: title})
    }
}

