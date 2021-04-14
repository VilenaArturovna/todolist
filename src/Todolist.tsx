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
    filter: 'all' | 'active' | 'completed'
}

export const Todolist = (props: TodolistPropsType) => {

    let [titleTask, setTitleTask] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (titleTask.trim() !== '') {
            props.addTask(titleTask)
            setTitleTask('')
        } else {
            setError('Title is required')
        }
    }
    const addTaskUsingEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null) //ошибка будет пропадать при наборе текста
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
                       onKeyPress={addTaskUsingEnterKey}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        debugger
                        props.changeStatusOfTask(t.id, newIsDoneValue)
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}