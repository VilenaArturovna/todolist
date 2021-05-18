import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "./auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AppStateType = {
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'  //простой, загрузка, успешно, сбой

const initialState: AppStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions

export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.authMe()
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(setIsLoggedInAC({value: true}))
                    }
                    dispatch(setIsInitializedAC({isInitialized: true}))
                }
            )
    }
}