import React from 'react';
// @ts-ignore
import {Meta} from '@storybook/react';
// @ts-ignore
import {action} from "@storybook/addon-actions/";
import {Task} from "../State/Task";

export default {
    title: 'Components/Task',
    component: Task,
} as Meta;

const removeCallback = action('Remove button inside task clicked')
const changeStatusCallback = action('Changed status inside task')
const changeTitleCallback = action('Changed title inside task')

export const TaskBaseExample = () => {
    return <>
        <Task task={{title: 'CSS', isDone: true, id: '1'}} todolistId={'1'}
                    changeStatusOfTask={changeStatusCallback}
                    changeTitleTask={changeTitleCallback} removeTask={removeCallback}/>
        <Task task={{title: 'JS', isDone: false, id: '2'}} todolistId={'2'}
              changeStatusOfTask={changeStatusCallback}
              changeTitleTask={changeTitleCallback} removeTask={removeCallback}/>
    </>
}