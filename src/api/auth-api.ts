import {instance, ResponseType} from "./todolist-api";

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    authMe() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>('/auth/me')
    },
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{userId?: number}>>('/auth/login', {data})
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login')
    }
}