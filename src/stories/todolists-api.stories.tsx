import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API/Todolist'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => {
        todolistAPI.addTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" placeholder={'Enter title'} value={title}
                       onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button onClick={createTodolist}>Create</button>
            </div>
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<string>('')

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(id)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" placeholder={'Enter todolist ID'} value={id}
                       onChange={(e) => setId(e.currentTarget.value)}/>
                <button onClick={deleteTodolist}>Delete</button>
            </div>
        </div>
    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolist = () => {
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" placeholder={'Enter todolist ID'} value={id}
                       onChange={(e) => setId(e.currentTarget.value)}/>
                <input type="text" placeholder={'Enter new title of todolist'} value={title}
                       onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button onClick={updateTodolist}>Update</button>
            </div>
        </div>
    )
}