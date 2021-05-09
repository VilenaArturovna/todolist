import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC,
    changeFilterOfTodolistAC,
    deleteTodolistTC,
    fetchTodolistsTC,
    updateTodolistTitleTC
} from "./State/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./State/Store";
import {TodolistType} from "./api/todolist-api";
import {TaskStatuses, TaskType} from "./api/task-api";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistEntityType = TodolistType & { filter: FilterValuesType }
export type TasksStateType = {
    [key: string]: Array<TaskType> // объект может иметь свойства-ключи, которые строковые
    // (а ключи вообще в объекте и не могут быть иными), а вот значения этих св-в - это массив объектов TaskType
}

function AppWithRedux() {

    const todolists = useSelector<RootStateType, Array<TodolistEntityType>>(state => state.todolists)
    const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    //ТАСКИ

    //добавление таски
    const addTask = useCallback((titleTask: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, titleTask))
    }, [dispatch])

    //удаление таски
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch])

    //смена наименования таски
    const changeTitleTask = useCallback((idTask: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, idTask, {title: newTitle}))
    }, [dispatch])

    //смена статуса выполнения таски
    const changeStatusOfTask = useCallback((idTask: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, idTask, {status}))
    }, [dispatch])

    //ТУДУЛИСТЫ

    //удаление тудулиста
    const removeTodolist = useCallback((id: string) => {
        dispatch(deleteTodolistTC(id))
    }, [dispatch])

    //добавление тудулиста
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    //смена наименования тудулиста
    const changeTitleTodolist = useCallback((newTitle: string, todolistId: string) => {
        dispatch(updateTodolistTitleTC(todolistId, newTitle))
    }, [dispatch])

    //смена фильтра
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterOfTodolistAC(todolistId, value))
    }, [dispatch])


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
                        return <Grid item key={t.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={t.id}
                                    id={t.id}
                                    title={t.title}
                                    filter={t.filter}
                                    tasks={tasks[t.id]}
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
