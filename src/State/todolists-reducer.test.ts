import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeFilterOfTodolistAC,
    changeTitleOfTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

//создаем переменные, необходимые для теста
let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType> = [];

//перед каждым тестом данные будут перезатираться
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ];
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(startState.length).toBe(2)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const newTodolistTitle = 'NeW ToDoLiSt'

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(startState.length).toBe(2)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    const newTodolistTitle = 'NeW ToDoLiSt'

    const endState = todolistsReducer(startState, changeTitleOfTodolistAC(todolistId2, newTodolistTitle))

    expect(endState.length).toBe(2)
    expect(startState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    const newFilter: FilterValuesType = 'active'

    const endState = todolistsReducer(startState, changeFilterOfTodolistAC(todolistId2, newFilter))

    expect(endState.length).toBe(2)
    expect(startState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

