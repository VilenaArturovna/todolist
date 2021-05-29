import {v1} from "uuid";
import {
    addTodolistTC,
    changeFilterOfTodolistAC, changeTodolistEntityStatusAC, deleteTodolistTC,

    fetchTodolistsTC,
    todolistsReducer, updateTodolistTitleTC
} from "./todolists-reducer";
import {FilterValuesType, TodolistEntityType} from "../AppWithRedux";
import {RequestStatusType} from "./app-reducer";

//создаем переменные, необходимые для теста
let todolistId1: string
let todolistId2: string
let startState: Array<TodolistEntityType> = [];

//перед каждым тестом данные будут перезатираться
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'succeeded'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 1, entityStatus: 'succeeded'}
    ];
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, deleteTodolistTC.fulfilled(todolistId1, '', todolistId1))

    expect(endState.length).toBe(1)
    expect(startState.length).toBe(2)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const newTodolist = {
        id: '3', title: 'New Todolist', addedDate: '', order: 0
    }

    const endState = todolistsReducer(startState, addTodolistTC.fulfilled({todolist: newTodolist}, '', newTodolist.title))

    expect(endState.length).toBe(3)
    expect(startState.length).toBe(2)
    expect(endState[0].title).toBe(newTodolist.title)
})

test('correct todolist should change its name', () => {
    const newTodolistTitle = 'NeW ToDoLiSt'

    const endState = todolistsReducer(startState, updateTodolistTitleTC.fulfilled({
        id: todolistId2,
        title: newTodolistTitle
    }, '', {id: todolistId2, title: newTodolistTitle}))

    expect(endState.length).toBe(2)
    expect(startState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    const newFilter: FilterValuesType = 'active'

    const endState = todolistsReducer(startState, changeFilterOfTodolistAC({id: todolistId2, filter: newFilter}))

    expect(endState.length).toBe(2)
    expect(startState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be received', () => {

    const endState = todolistsReducer([], fetchTodolistsTC.fulfilled({todolists: startState}, ''))

    expect(endState.length).toBe(2)
})

test('correct todolist entityStatus should be changed', () => {
    const newStatus: RequestStatusType = 'loading'

    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC({
        id: todolistId1,
        entityStatus: newStatus
    }))

    expect(startState[0].entityStatus).toBe('succeeded')
    expect(endState[0].entityStatus).toBe(newStatus)
    expect(endState[1].entityStatus).toBe('succeeded')
})
