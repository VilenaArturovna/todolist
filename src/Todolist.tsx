import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {FilterValuesType, TodolistEntityType} from "./AppWithRedux";
import {TaskStatuses, TaskType} from "./api/task-api";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./State/tasks-reducer";


type TodolistPropsType = {
    todolist: TodolistEntityType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (titleTask: string, todolistId: string) => void
    changeStatusOfTask: (idTask: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTitleTask: (idTask: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    demo?: boolean
}

export const Todolist = React.memo((
    {
        todolist, tasks, removeTask, changeFilter, addTask, changeStatusOfTask, removeTodolist,
        changeTitleTask, changeTodolistTitle, demo = false
    }: TodolistPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {    //если демо-режим для storybook, то не диспатчить санку
            return;
        }
        dispatch(fetchTasksTC(todolist.id))

    }, [dispatch, todolist.id, demo])

    const createTask = useCallback((title: string) => { //хук чтобы addItemForm не перерисовывалась постоянно
        addTask(title, todolist.id)
    }, [addTask, todolist.id])

    const onChangeTodolistTitle = useCallback((newValue: string) => {
        changeTodolistTitle(newValue, todolist.id)
    }, [changeTodolistTitle, todolist.id])

    const onAllClickHandler = useCallback(() => changeFilter('all', todolist.id), [changeFilter, todolist.id])
    const onActiveClickHandler = useCallback(() => changeFilter('active', todolist.id), [changeFilter, todolist.id])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', todolist.id), [changeFilter, todolist.id])

    let tasksForTodolist = tasks
    if (todolist.filter === 'active') tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.InProgress)
    if (todolist.filter === 'completed') tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)

    return (
        <div>
            <div>
                <EditableSpan value={todolist.title} onChange={onChangeTodolistTitle} disabled={todolist.entityStatus === 'loading'}/>
                <IconButton onClick={() => removeTodolist(todolist.id)} disabled={todolist.entityStatus === 'loading'}><Delete/></IconButton>
            </div>

            <AddItemForm addItem={createTask} disabled={todolist.entityStatus === 'loading'}/>

            <div>
                {tasksForTodolist.map(t => {
                    return <Task todolistId={todolist.id} task={t} key={t.id} changeTitleTask={changeTitleTask}
                                 removeTask={removeTask} changeStatusOfTask={changeStatusOfTask}/>
                })}
            </div>

            <div>
                <Button variant={todolist.filter === 'all' ? "outlined" : 'text'}
                        onClick={onAllClickHandler}>
                    All
                </Button>
                <Button variant={todolist.filter === 'active' ? "outlined" : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>
                    Active
                </Button>
                <Button variant={todolist.filter === 'completed' ? "outlined" : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>
                    Completed
                </Button>
            </div>
        </div>
    )
})