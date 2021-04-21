import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (titleTask: string, todolistId: string) => void
    changeStatusOfTask: (idTask: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTitleTask: (idTask: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onChangeTodolistTitle = (newValue: string) => {
        props.changeTodolistTitle(newValue, props.id)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    return (
        <div>
            <div>
                <EditableSpan value={props.title} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={() => props.removeTodolist(props.id)}><Delete/></IconButton>
            </div>

            <AddItemForm addItem={addTask}/>

            <div>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = e.currentTarget.checked
                        props.changeStatusOfTask(t.id, newIsDoneValue, props.id)
                    }

                    const onChangeTitle = (newValue: string) => {
                        props.changeTitleTask(t.id, newValue, props.id)
                    }

                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox color={'primary'} checked={t.isDone} onChange={onChangeHandler}/>
                        <EditableSpan value={t.title} onChange={onChangeTitle}/>
                        <IconButton onClick={onClickHandler}><Delete/></IconButton>
                    </div>
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
}