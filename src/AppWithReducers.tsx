import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeFilterOfTodolistAC,
    changeTitleOfTodolistAC,
    removeTodolistAC, TodolistActionType,
    todolistsReducer
} from "./State/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";
import {FilterValuesType, TodolistEntityType} from "./AppWithRedux";
import {TaskStatuses, TaskType} from "./api/task-api";

export type TasksStateType = {
    [key: string]: Array<TaskType> // объект может иметь свойства-ключи, которые строковые
    // (а ключи вообще в объекте и не могут быть иными), а вот значения этих св-в - это массив объектов TaskType
}

function AppWithReducers() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer<React.Reducer<TodolistEntityType[], TodolistActionType>>(todolistsReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 1}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
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
    const addTask = (titleTask: string, todolistId: string) => {
        dispatchToTasks(addTaskAC(todolistId, titleTask))
    }

    //удаление таски
    const removeTask = (id: string, todolistId: string) => {
        dispatchToTasks(removeTaskAC(todolistId, id))
    }

    //смена наименования таски
    const changeTitleTask = (idTask: string, newTitle: string, todolistId: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, idTask, newTitle))
    }

    //смена статуса выполнения таски
    const changeStatusOfTask = (idTask: string, status: TaskStatuses, todolistId: string) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, idTask, status))
    }

    //ТУДУЛИСТЫ

    //удаление тудулиста
    const removeTodolist = (id: string) => {
        const action = removeTodolistAC(id)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    //добавление тудулиста
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title) //обязательно через переменную, т.к. нужно АС вызвать только один раз!!
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    //смена наименования тудулиста
    const changeTitleTodolist = (newTitle: string, todolistId: string) => {
        dispatchToTodolists(changeTitleOfTodolistAC(todolistId, newTitle))
    }

    //смена фильтра
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchToTodolists(changeFilterOfTodolistAC(todolistId, value))
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

export default AppWithReducers;
