import {setAppErrorAC, setAppStatusAC} from "../State/app-reducer";
import {ResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
        dispatch(setAppStatusAC({status: 'failed'}))
    }
    dispatch(setAppErrorAC({error: 'Some error occurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}
export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : null}))
    dispatch(setAppStatusAC({status: 'failed'}))

}
