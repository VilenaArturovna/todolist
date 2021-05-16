import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistType} from "./api/todolist-api";
import {TaskType} from "./api/task-api";
import {initializeAppTC, RequestStatusType} from "./State/app-reducer";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {TodolistList} from "./TodolistList";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./State/Store";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "./Login";
import {logoutTC} from "./State/auth-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistEntityType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }
export type TasksStateType = {
    [key: string]: Array<TaskType> // объект может иметь свойства-ключи, которые строковые
    // (а ключи вообще в объекте и не могут быть иными), а вот значения этих св-в - это массив объектов TaskType
}

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false}: PropsType) {
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<RootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
}

export default AppWithRedux;
