import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "./components/AddItemForm";
import {Todolist} from "./Todolist";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./State/Store";
import {
    addTodolistTC,
    changeFilterOfTodolistAC,
    deleteTodolistTC,
    fetchTodolistsTC,
    updateTodolistTitleTC
} from "./State/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./State/tasks-reducer";
import {TaskStatuses} from "./api/task-api";
import {FilterValuesType, TasksStateType, TodolistEntityType} from "./AppWithRedux";
import {Redirect} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistList = ({demo = false}: PropsType) => {
    const todolists = useSelector<RootStateType, Array<TodolistEntityType>>(state => state.todolists)
    const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)


    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {    //если демо-режим для storybook или не залогинены, то не диспатчить санку
            return;
        }
        dispatch(fetchTodolistsTC())
    }, [dispatch, demo, isLoggedIn])

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
        dispatch(changeFilterOfTodolistAC({id: todolistId, filter: value}))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return <div>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map(tl => {
                return <Grid item key={tl.id}>
                    <Paper style={{padding: '10px'}}>
                        <Todolist
                            key={tl.id}
                            todolist={tl}
                            tasks={tasks[tl.id]}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatusOfTask={changeStatusOfTask}
                            removeTodolist={removeTodolist}
                            changeTitleTask={changeTitleTask}
                            changeTodolistTitle={changeTitleTodolist}
                            demo={demo}
                        />
                    </Paper>
                </Grid>
            })}
        </Grid>
    </div>
}