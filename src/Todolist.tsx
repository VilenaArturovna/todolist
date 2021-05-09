import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {FilterValuesType} from "./AppWithRedux";
import {TaskStatuses, TaskType} from "./api/task-api";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./State/tasks-reducer";


type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (titleTask: string, todolistId: string) => void
    changeStatusOfTask: (idTask: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTitleTask: (idTask: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo((
    {
        id, title, filter, tasks, removeTask, changeFilter, addTask, changeStatusOfTask, removeTodolist,
        changeTitleTask, changeTodolistTitle
    }: TodolistPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [dispatch, id])

    const createTask = useCallback((title: string) => { //хук чтобы addItemForm не перерисовывалась постоянно
        addTask(title, id)
    }, [addTask, id])

    const onChangeTodolistTitle = useCallback((newValue: string) => {
        changeTodolistTitle(newValue, id)
    }, [changeTodolistTitle, id])

    const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id])

    let tasksForTodolist = tasks
    if (filter === 'active') tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.InProgress)
    if (filter === 'completed') tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)

    return (
        <div>
            <div>
                <EditableSpan value={title} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={() => removeTodolist(id)}><Delete/></IconButton>
            </div>

            <AddItemForm addItem={createTask}/>

            <div>
                {tasksForTodolist.map(t => {
                    return <Task todolistId={id} task={t} key={t.id} changeTitleTask={changeTitleTask}
                                 removeTask={removeTask} changeStatusOfTask={changeStatusOfTask}/>
                })}
            </div>

            <div>
                <Button variant={filter === 'all' ? "outlined" : 'text'}
                        onClick={onAllClickHandler}>
                    All
                </Button>
                <Button variant={filter === 'active' ? "outlined" : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? "outlined" : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>
                    Completed
                </Button>
            </div>
        </div>
    )
})