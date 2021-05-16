import {appReducer, AppStateType, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "./app-reducer";

let startState: AppStateType

beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('some error'))

    expect(endState.error).toBe('some error')
    expect(startState.error).toBe(null)
})
test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC("succeeded"))

    expect(endState.status).toBe("succeeded")
    expect(startState.status).toBe("idle")
})
test('initialized status should be changed', () => {
    const endState = appReducer(startState, setIsInitializedAC(true))

    expect(endState.isInitialized).toBe(true)
    expect(startState.isInitialized).toBe(false)
})