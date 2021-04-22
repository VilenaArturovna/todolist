import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    AddTodolistAC,
    ChangeFilterOfTodolistAC,
    ChangeTitleOfTodolistAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolists-reducer";

const todolistId1 = v1()
const todolistId2 = v1()

const startState: Array<TodolistType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
];

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(startState.length).toBe(2)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const newTodolistTitle = 'NeW ToDoLiSt'

    const endState = todolistReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(startState.length).toBe(2)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    const newTodolistTitle = 'NeW ToDoLiSt'

    const endState = todolistReducer(startState, ChangeTitleOfTodolistAC(todolistId2, newTodolistTitle))

    expect(endState.length).toBe(2)
    expect(startState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    const newFilter: FilterValuesType = 'active'

    const endState = todolistReducer(startState, ChangeFilterOfTodolistAC(todolistId2, newFilter))

    expect(endState.length).toBe(2)
    expect(startState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

