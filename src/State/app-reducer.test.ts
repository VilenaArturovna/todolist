import {appReducer, AppStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: AppStateType

beforeEach(() => {
    startState = {
        status: "idle",
        error: null
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