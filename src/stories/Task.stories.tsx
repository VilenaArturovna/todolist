import React from 'react';
// @ts-ignore
import {Meta} from '@storybook/react';
// @ts-ignore
import {action} from "@storybook/addon-actions/";
import {Task} from "../Task";
import {TaskStatuses} from "../api/task-api";

export default {
    title: 'Components/Task',
    component: Task,
} as Meta;

const removeCallback = action('Remove button inside task clicked')
const changeStatusCallback = action('Changed status inside task')
const changeTitleCallback = action('Changed title inside task')

export const TaskBaseExample = () => {
    return <>
        <Task task={{title: 'CSS', status: TaskStatuses.Completed, id: '1', todoListId: '1',
                    order: 1,
                    addedDate: '',
                    deadline: '',
                    description: '',
                    priority: 0,
                    startDate: ''}} todolistId={'1'}
                    changeStatusOfTask={changeStatusCallback}
                    changeTitleTask={changeTitleCallback} removeTask={removeCallback}/>
        <Task task={{title: 'JS', status: TaskStatuses.InProgress, id: '2', todoListId: '2',
                    order: 1,
                    addedDate: '',
                    deadline: '',
                    description: '',
                    priority: 0,
                    startDate: ''}} todolistId={'2'}
              changeStatusOfTask={changeStatusCallback}
              changeTitleTask={changeTitleCallback} removeTask={removeCallback}/>
    </>
}