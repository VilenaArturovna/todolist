import {userReducer} from "./user-reducer";

const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

test('user reducer should increment only age', () => {
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(startState.age).toBe(20)
    expect(endState.childrenCount).toBe(2)
})

test(`user reducer should increment only children count`, () => {
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
    expect(startState.childrenCount).toBe(2)
})

test(`user reducer should only change name`, () => {
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: 'Viktor'})

    expect(endState.name).not.toBe('Dimych')
    expect(endState.name).toBe('Viktor')
})