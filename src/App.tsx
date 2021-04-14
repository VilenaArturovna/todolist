import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: true},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    //добавление таски
    const addTask = (titleTask: string) => {
        let task: TaskType = {id: v1(), title: titleTask, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    //удаление таски
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    //смена фильтра
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    //смена статуса выполнения таски
    const changeStatusOfTask = (idTask: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === idTask)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatusOfTask={changeStatusOfTask}
                filter={filter}
            />
        </div>
    );
}

export default App;
