import {TasksStateType} from "../App";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, ChangeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

const startState: TasksStateType = {
    "todolistId1": [
        {id: "1", title: "CSS", isDone: false},
        {id: "2", title: "JS", isDone: true},
        {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
        {id: "1", title: "bread", isDone: false},
        {id: "2", title: "milk", isDone: true},
        {id: "3", title: "tea", isDone: false}
    ]
}

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'))

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    })
    expect(startState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(startState, addTaskAC('todolistId2', 'juice'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(startState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
    const endState = tasksReducer(startState, ChangeTaskTitleAC('todolistId2', '2', 'coconut'))

    expect(endState['todolistId2'][1].title).toBe('coconut')
    expect(startState['todolistId2'][1].title).toBe('milk')
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '2', false))

    expect(startState['todolistId2'][1].isDone).toBe(true)
    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId2'][2].isDone).toBe(false)
})

test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodolistAC("new todolist"))


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);

})



test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, removeTodolistAC("todolistId2"))

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
    expect(startState["todolistId2"]).toBeDefined();
});

