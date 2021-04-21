import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id) //filter возвращает отфильтрованный массив
        case 'ADD-TODOLIST':
           return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all'
            }]
        case 'CHANGE-TODOLIST-TITLE':

            return state
        default:
            throw new Error(`I don't understand this type`)
    }
}