import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {FilterValuesType} from "./AppWithRedux";
import {TaskStatuses, TaskType} from "./api/task-api";


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

export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('todolist called')

    const addTask = useCallback((title: string) => { //хук чтобы addItemForm не перерисовывалась постоянно
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onChangeTodolistTitle = useCallback((newValue: string) => {
        props.changeTodolistTitle(newValue, props.id)
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

    let tasksForTodolist = props.tasks
    if (props.filter === 'active') tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.InProgress)
    if (props.filter === 'completed') tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)

    return (
        <div>

            <div>
                <EditableSpan value={props.title} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={() => props.removeTodolist(props.id)}><Delete/></IconButton>
            </div>

            <AddItemForm addItem={addTask}/>

            <div>
                {tasksForTodolist.map(t => {
                    return <Task todolistId={props.id} task={t} key={t.id} changeTitleTask={props.changeTitleTask}
                                 removeTask={props.removeTask} changeStatusOfTask={props.changeStatusOfTask}/>
                })}
            </div>

            <div>
                <Button variant={props.filter === 'all' ? "outlined" : 'text'}
                        onClick={onAllClickHandler}>
                    All
                </Button>
                <Button variant={props.filter === 'active' ? "outlined" : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>
                    Active
                </Button>
                <Button variant={props.filter === 'completed' ? "outlined" : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>
                    Completed
                </Button>
            </div>

        </div>
    )
})