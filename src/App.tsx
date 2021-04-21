import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType> // объект может иметь свойства-ключи, которые строковые (а ключи вообще в объекте и не могут быть иными), а вот значения этих св-в это массив объектов TaskType
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
            [todolistId1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: false},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: true},
                {id: v1(), title: 'Redux', isDone: true},],
            [todolistId2]: [
                {id: v1(), title: 'Bread', isDone: true},
                {id: v1(), title: 'Peanut butter', isDone: false},
                {id: v1(), title: 'Cabbage', isDone: true},
                {id: v1(), title: 'Bananas', isDone: true},]
        }
    )

    //ТАСКИ

    //добавление таски
    const addTask = (titleTask: string, todolistId: string) => {
        let task: TaskType = {id: v1(), title: titleTask, isDone: false}
        tasks[todolistId] = [task, ...tasks[todolistId]]
        setTasks({...tasks})
    }

    //удаление таски
    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    //смена наименования таски
    const changeTitleTask = (idTask: string, newTitle: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === idTask)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    //смена статуса выполнения таски
    const changeStatusOfTask = (idTask: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === idTask)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    //ТУДУЛИСТЫ

    //удаление тудулиста
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(t => t.id !== id))  //сетаем отфильтрованный массив тудулистов без удаляемого
        delete tasks[id] //удаление всех тасок этого тудулиста
    }

    //добавление тудулиста
    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})  //ассоциативный массив
    }

    //смена наименования тудулиста
    const changeTitleTodolist = (newTitle: string, todolistId: string) => {

        let todo = todolists.find(t => t.id === todolistId)
        if (todo) {
            todo.title = newTitle
            setTodolists([...todolists])
        }
    }

    //смена фильтра
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
            //если есть тудулист, то принимаем значение фильтра для нужного тудулиста из параметров функции, модифицировав его при этом, затем сетаем копию тудулистов, так меняется фильтр на актуальный и затем передается через пропсы в конкретный тудулист
        }
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(t => {
                let tasksForTodolist = tasks[t.id]
                if (t.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                }
                if (t.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                }

                return <Todolist
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    filter={t.filter}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatusOfTask={changeStatusOfTask}
                    removeTodolist={removeTodolist}
                    changeTitleTask={changeTitleTask}
                    changeTodolistTitle={changeTitleTodolist}
                />

            })}
        </div>
    );
}

export default App;
