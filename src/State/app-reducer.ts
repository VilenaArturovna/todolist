import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "./auth-reducer";

const initialState: AppStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

export const appReducer = (state: AppStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        case "auth/SET-IS-INITIALIZED": {
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'  //простой, загрузка, успешно, сбой

export type AppStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
type ActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC> | ReturnType<typeof setIsInitializedAC>

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (value: boolean) => ({type: 'auth/SET-IS-INITIALIZED', value} as const)

export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.authMe()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsInitializedAC(true))
                    dispatch(setIsLoggedInAC(true))
                }
            }
            )
    }
}