import React from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/> <span key={t.id}>{t.title}</span></li>)}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}