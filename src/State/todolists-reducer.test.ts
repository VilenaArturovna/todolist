import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterOfTodolistAC,
    changeTodolistTitleAC,
    deleteTodolistAC, setTodolistsAC,
    todolistsReducer
} from "./todolists-reducer";
import {FilterValuesType, TodolistEntityType} from "../AppWithRedux";

//создаем переменные, необходимые для теста
let todolistId1: string
let todolistId2: string
let startState: Array<TodolistEntityType> = [];

//перед каждым тестом данные будут перезатираться
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 1}
    ];
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(startState.length).toBe(2)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const newTodolist = {
        id: '3', title: 'New Todolist', addedDate: '', order: 0
    }

    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3)
    expect(startState.length).toBe(2)
    expect(endState[2].title).toBe(newTodolist.title)
})

test('correct todolist should change its name', () => {
    const newTodolistTitle = 'NeW ToDoLiSt'

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

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

test('todolists should be received', () => {

    const endState = todolistsReducer([], setTodolistsAC(startState))

    expect(endState.length).toBe(2)
})

