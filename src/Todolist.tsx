import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";

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
}

export const Todolist = (props: TodolistPropsType) => {
    debugger

    let [titleTask, setTitleTask] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (titleTask.trim() !== '') {
            props.addTask(titleTask, props.id)
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

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    return (
        <div>
            <div>
                <span>{props.title}</span>
                <button onClick={() => props.removeTodolist(props.id)}>X</button>
            </div>
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
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        debugger
                        props.changeStatusOfTask(t.id, newIsDoneValue, props.id)
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