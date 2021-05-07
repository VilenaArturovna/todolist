import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from "./tasks-reducer";
import {TaskStatuses} from "../api/task-api";
import {TasksStateType} from "../AppWithRedux";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.InProgress,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.InProgress,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.InProgress,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.InProgress,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'))

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.InProgress,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.InProgress,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.InProgress,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.InProgress,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            }
        ]
    })
    expect(startState).toEqual({
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.InProgress,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.InProgress,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.InProgress,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.InProgress,
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                deadline: '',
                description: '',
                priority: 0,
                startDate: ''
            }
        ]
    })
})

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(startState, addTaskAC({
        id: "1",
        title: "juice",
        status: TaskStatuses.InProgress,
        todoListId: "todolistId2",
        order: 1,
        addedDate: '',
        deadline: '',
        description: '',
        priority: 0,
        startDate: ''
    }))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(startState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.InProgress)
})

test('title of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC('todolistId2', '2', 'coconut'))

    expect(endState['todolistId2'][1].title).toBe('coconut')
    expect(startState['todolistId2'][1].title).toBe('milk')
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '2', TaskStatuses.InProgress))

    expect(startState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.InProgress)
    expect(endState['todolistId2'][2].status).toBe(TaskStatuses.InProgress)
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

test('empty arrays of tasks should be received into todolists', () => {
    const endState = tasksReducer({}, setTodolistsAC([
        {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', addedDate: '', order: 1}
    ]))

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["todolistId1"]).toStrictEqual([]);
    expect(endState["todolistId2"]).toStrictEqual([]);
});

test('array of tasks should be received into todolist', () => {
    const tasks = [
        {
            id: "1",
            title: "bread",
            status: TaskStatuses.InProgress,
            todoListId: "todolistId1",
            order: 1,
            addedDate: '',
            deadline: '',
            description: '',
            priority: 0,
            startDate: ''
        },
        {
            id: "2",
            title: "milk",
            status: TaskStatuses.Completed,
            todoListId: "todolistId1",
            order: 1,
            addedDate: '',
            deadline: '',
            description: '',
            priority: 0,
            startDate: ''
        },
        {
            id: "3",
            title: "tea",
            status: TaskStatuses.InProgress,
            todoListId: "todolistId1",
            order: 1,
            addedDate: '',
            deadline: '',
            description: '',
            priority: 0,
            startDate: ''
        }
    ]
    const endState = tasksReducer({}, setTasksAC('todolistId1', tasks))

    expect(endState["todolistId1"].length).toBe(3);
});

