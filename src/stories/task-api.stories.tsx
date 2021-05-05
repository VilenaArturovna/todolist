import React, {useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
    title: 'API/Task'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        taskAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" placeholder={'Enter todolist ID'} value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <button onClick={getTasks}>Get tasks</button>
            </div>
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        taskAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" placeholder={'Enter todolist ID'} value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <input type="text" placeholder={'Enter new task title'} value={title}
                       onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button onClick={createTask}>Create task</button>
            </div>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" placeholder={'Enter todolist ID'} value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <input type="text" placeholder={'Enter task ID'} value={taskId}
                       onChange={(e) => setTaskId(e.currentTarget.value)}/>
                <button onClick={deleteTask}>Create task</button>
            </div>
        </div>
    )
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)

    const updateTask = () => {
        taskAPI.updateTaskTitle(todolistId, taskId, {
            title,
            deadline: '',
            status,
            description,
            priority: 0,
            startDate: ''
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'Enter todolist ID'} value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <input placeholder={'Enter task ID'} value={taskId}
                       onChange={(e) => setTaskId(e.currentTarget.value)}/>
                <input placeholder={'Enter task new task title'} value={title}
                       onChange={(e) => setTitle(e.currentTarget.value)}/>
                <input placeholder={'Enter task new task description'} value={description}
                       onChange={(e) => setDescription(e.currentTarget.value)}/>
                <input placeholder={'Enter task status'} value={status}
                       onChange={(e) => setStatus(+e.currentTarget.value)}/>
                <button onClick={updateTask}>Update task</button>
            </div>
        </div>
    )
}