import {setAppErrorAC, setAppStatusAC} from "../State/app-reducer";
import {ResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
        dispatch(setAppStatusAC('failed'))
    }
    dispatch(setAppErrorAC('Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message ? error.message : null))
    dispatch(setAppStatusAC('failed'))

}
