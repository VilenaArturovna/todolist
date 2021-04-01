import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    const tasks1: Array<TaskType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'JS', isDone: true},
    ]
    const tasks2: Array<TaskType> = [
        {id: 1, title: 'Yesterday', isDone: true},
        {id: 2, title: 'Show must go on', isDone: false},
        {id: 3, title: 'Vermilion', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks1}/>
            <Todolist title={'Songs'} tasks={tasks2}/>
        </div>
    );
}

export default App;
