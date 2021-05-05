import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {FilterValuesType, TodolistEntityType} from "./AppWithRedux";
import {TaskStatuses, TaskType} from "./api/task-api";

export type TasksStateType = {
    [key: string]: Array<TaskType> // объект может иметь свойства-ключи, которые строковые
    // (а ключи вообще в объекте и не могут быть иными), а вот значения этих св-в - это массив объектов TaskType
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistEntityType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 1}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
            [todolistId1]: [
                {
                    id: v1(),
                    title: 'HTML',
                    status: TaskStatuses.Completed,
                    todoListId: todolistId1,
                    order: 1,
                    addedDate: '',
                    deadline: '',
                    description: '',
                    priority: 0,
                    startDate: ''
                },
                {
                    id: v1(),
                    title: 'CSS',
                    status: TaskStatuses.InProgress,
                    todoListId: todolistId1,
                    order: 1,
                    addedDate: '',
                    deadline: '',
                    description: '',
                    priority: 0,
                    startDate: ''
                }],
            [todolistId2]: [
                {
                    id: v1(),
                    title: 'Bread',
                    status: TaskStatuses.Completed,
                    todoListId: todolistId2,
                    order: 1,
                    addedDate: '',
                    deadline: '',
                    description: '',
                    priority: 0,
                    startDate: ''
                },
                {
                    id: v1(),
                    title: 'Peanut butter',
                    status: TaskStatuses.Completed,
                    todoListId: todolistId2,
                    order: 1,
                    addedDate: '',
                    deadline: '',
                    description: '',
                    priority: 0,
                    startDate: ''
                }]
        }
    )

    //ТАСКИ

    //добавление таски
    const addTask = (titleTask: string, todoListId: string) => {
        let task: TaskType = {id: v1(), title: titleTask, status: TaskStatuses.InProgress,
            todoListId,
            order: 1,
            addedDate: '',
            deadline: '',
            description: '',
            priority: 0,
            startDate: ''}
        tasks[todoListId] = [task, ...tasks[todoListId]]
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
    const changeStatusOfTask = (idTask: string, status: TaskStatuses, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === idTask)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }
    }

    //ТУДУЛИСТЫ

    //удаление тудулиста
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(t => t.id !== id))  //сетаем отфильтрованный массив тудулистов без удаляемого
        delete tasks[id] //удаление всех тасок этого тудулиста
        setTasks({...tasks})
    }

    //добавление тудулиста
    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistEntityType = {
            id: newTodolistId,
            title: title,
            filter: 'all',
            addedDate: '',
            order: 0
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
            //если есть тудулист, то принимаем значение фильтра для нужного тудулиста из параметров функции,
            // модифицировав его при этом, затем сетаем копию тудулистов, так меняется фильтр на актуальный
            // и затем передается через пропсы в конкретный тудулист
        }
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(t => {
                        let tasksForTodolist = tasks[t.id]
                        if (t.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.InProgress)
                        }
                        if (t.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
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
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
