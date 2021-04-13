import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (titleTask: string) => void
    changeStatusOfTask: (idTask: string, isDone: boolean) => void
}

export const Todolist = (props: TodolistPropsType) => {

    let [titleTask, setTitleTask] = useState<string>('')

    const addTask = () => {
        props.addTask(titleTask)
        setTitleTask('')
    }
    const addTaskUsingEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitleTask(e.currentTarget.value)

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={titleTask}
                       onChange={changeTitle}
                       onKeyPress={addTaskUsingEnterKey}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        debugger
                        props.changeStatusOfTask(t.id, newIsDoneValue)
                    }
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}