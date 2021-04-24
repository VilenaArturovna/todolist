import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeFilterOfTodolistAC,
    changeTitleOfTodolistAC,
    removeTodolistAC, TodolistActionType,
    todolistsReducer
} from "./State/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType> // объект может иметь свойства-ключи, которые строковые
    // (а ключи вообще в объекте и не могут быть иными), а вот значения этих св-в - это массив объектов TaskType
}

function AppWithReducers() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer<React.Reducer<TodolistType[], TodolistActionType>>(todolistsReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
            [todolistId1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: false},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: true},
                {id: v1(), title: 'Redux', isDone: true},],
            [todolistId2]: [
                {id: v1(), title: 'Bread', isDone: true},
                {id: v1(), title: 'Peanut butter', isDone: false},
                {id: v1(), title: 'Cabbage', isDone: true},
                {id: v1(), title: 'Bananas', isDone: true},]
        }
    )

    //ТАСКИ

    //добавление таски
    const addTask = (titleTask: string, todolistId: string) => {
        dispatchToTasks(addTaskAC(todolistId, titleTask))
    }

    //удаление таски
    const removeTask = (id: string, todolistId: string) => {
        dispatchToTasks(removeTaskAC(todolistId, id))
    }

    //смена наименования таски
    const changeTitleTask = (idTask: string, newTitle: string, todolistId: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, idTask, newTitle))
    }

    //смена статуса выполнения таски
    const changeStatusOfTask = (idTask: string, isDone: boolean, todolistId: string) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, idTask, isDone))
    }

    //ТУДУЛИСТЫ

    //удаление тудулиста
    const removeTodolist = (id: string) => {
        const action = removeTodolistAC(id)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    //добавление тудулиста
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title) //обязательно через переменную, т.к. нужно АС вызвать только один раз!!
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    //смена наименования тудулиста
    const changeTitleTodolist = (newTitle: string, todolistId: string) => {
        dispatchToTodolists(changeTitleOfTodolistAC(todolistId, newTitle))
    }

    //смена фильтра
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchToTodolists(changeFilterOfTodolistAC(todolistId, value))
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(t => {
                        let tasksForTodolist = tasks[t.id]
                        if (t.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                        }
                        if (t.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={t.id}
                                    id={t.id}
                                    title={t.title}
                                    filter={t.filter}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatusOfTask={changeStatusOfTask}
                                    removeTodolist={removeTodolist}
                                    changeTitleTask={changeTitleTask}
                                    changeTodolistTitle={changeTitleTodolist}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
