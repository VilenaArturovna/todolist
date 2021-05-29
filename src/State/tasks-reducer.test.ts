import {addTodolistTC, deleteTodolistTC, fetchTodolistsTC} from "./todolists-reducer";
import {tasksReducer, fetchTasksTC, removeTaskTC, addTaskTC, updateTaskTC} from "./tasks-reducer";
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
    const endState = tasksReducer(startState, removeTaskTC.fulfilled({
        todolistId: 'todolistId2',
        id: '2'
    }, '', {todolistId: 'todolistId2', taskId: '2'}))

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
    const task = {
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
    }
    const endState = tasksReducer(startState, addTaskTC.fulfilled({task}, '', {
        todolistId: task.todoListId,
        title: task.title
    }))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(startState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.InProgress)
})

test('title of specified task should be changed', () => {
    const endState = tasksReducer(startState, updateTaskTC.fulfilled({
        todolistId: 'todolistId2', id: '2', model: {title: 'coconut'}
    }, '', {
        todolistId: 'todolistId2', taskId: '2', domainModel: {title: 'coconut'}
    }))

    expect(endState['todolistId2'][1].title).toBe('coconut')
    expect(startState['todolistId2'][1].title).toBe('milk')
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, updateTaskTC.fulfilled(
        {todolistId: 'todolistId2', id: '2', model: {status: TaskStatuses.InProgress}}, '', {
            todolistId: 'todolistId2',
            taskId: '2',
            domainModel: {status: TaskStatuses.InProgress}
        }))

    expect(startState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.InProgress)
    expect(endState['todolistId2'][2].status).toBe(TaskStatuses.InProgress)
})

test('new array should be added when new todolist is added', () => {
    const newTodolist = {
        id: '3', title: 'New Todolist', addedDate: '', order: 0
    }
    const endState = tasksReducer(startState, addTodolistTC.fulfilled({
        todolist: newTodolist}, '', newTodolist.title))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})


test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistTC.fulfilled("todolistId2", '', "todolistId2"))

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
    expect(startState["todolistId2"]).toBeDefined();
});

test('empty arrays of tasks should be received into todolists', () => {
    const endState = tasksReducer({}, fetchTodolistsTC.fulfilled({
        todolists: [
            {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'loading'},
            {id: 'todolistId2', title: 'What to buy', addedDate: '', order: 1, filter: 'all', entityStatus: 'loading'}
        ]
    }, ''))

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["todolistId1"]).toStrictEqual([]);
    expect(endState["todolistId2"]).toStrictEqual([]);
});

test('array of tasks should be received into todolist', () => {
    const endState = tasksReducer({}, fetchTasksTC.fulfilled({
        todolistId: 'todolistId1',
        tasks: startState['todolistId2']
    }, '', 'todolistId1'))

    expect(endState["todolistId1"].length).toBe(3);
});

