import {Snackbar} from "@material-ui/core";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import React, {SyntheticEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../State/Store";
import {setAppErrorAC} from "../State/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const ErrorSnackbar = () => {
    const error = useSelector<RootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const isOpen = (error !== null)

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC({error: null})) //чтобы ошибка исчезла
    }

    return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
            {error}
        </Alert>
    </Snackbar>)
}