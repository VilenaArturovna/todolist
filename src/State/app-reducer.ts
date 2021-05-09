export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'  //простой, загрузка, успешно, сбой

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null
}

type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
type ActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>

export const appReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)