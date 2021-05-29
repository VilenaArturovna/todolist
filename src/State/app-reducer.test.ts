import {appReducer, AppStateType, initializeAppTC, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: AppStateType

beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC({error:'some error'}))

    expect(endState.error).toBe('some error')
    expect(startState.error).toBe(null)
})
test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC({status: "succeeded"}))

    expect(endState.status).toBe("succeeded")
    expect(startState.status).toBe("idle")
})
test('initialized status should be changed', () => {
    const endState = appReducer(startState, initializeAppTC.fulfilled(void, ''))

    expect(endState.isInitialized).toBe(true)
    expect(startState.isInitialized).toBe(false)
})