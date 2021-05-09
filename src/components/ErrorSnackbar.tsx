import {Snackbar} from "@material-ui/core";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import React, {SyntheticEvent, useState} from "react";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const ErrorSnackbar = () => {
    const [open, setOpen] = useState<boolean>(true)

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            This is a success message!
        </Alert>
    </Snackbar>)
}