import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "./auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AppStateType = {
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'  //простой, загрузка, успешно, сбой

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (arg, thunkAPI) => {
    const res = await authAPI.authMe()
    if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setIsLoggedInAC({value: true}))
    }
})

const slice = createSlice({
    name: 'app',
    initialState:  {
        status: "idle",
        error: null,
        isInitialized: false
    } as AppStateType,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state)=>{
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC} = slice.actions

