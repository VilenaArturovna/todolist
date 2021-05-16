import {authReducer, setIsLoggedInAC} from "./auth-reducer";

const startState = {
    isLoggedIn: false
}

test('authorization status should be changed', () => {
    const endState = authReducer(startState, setIsLoggedInAC(true))

    expect(startState.isLoggedIn).toBe(false)
    expect(endState.isLoggedIn).toBe(true)
})