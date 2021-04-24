import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeFilterOfTodolistAC,
    changeTitleOfTodolistAC,
    removeTodolistAC
} from "./State/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./State/Store";

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

function AppWithRedux() {

    const todolists = useSelector<RootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    //ТАСКИ

    //добавление таски
    const addTask = (titleTask: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId, titleTask))
    }

    //удаление таски
    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }

    //смена наименования таски
    const changeTitleTask = (idTask: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, idTask, newTitle))
    }

    //смена статуса выполнения таски
    const changeStatusOfTask = (idTask: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, idTask, isDone))
    }

    //ТУДУЛИСТЫ

    //удаление тудулиста
    const removeTodolist = (id: string) => {
        dispatch(removeTodolistAC(id))
    }

    //добавление тудулиста
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    //смена наименования тудулиста
    const changeTitleTodolist = (newTitle: string, todolistId: string) => {
        dispatch(changeTitleOfTodolistAC(todolistId, newTitle))
    }

    //смена фильтра
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterOfTodolistAC(todolistId, value))
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

export default AppWithRedux;
