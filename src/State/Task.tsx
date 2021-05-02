import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "../Todolist";

type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (id: string, todolistId: string) => void
    changeTitleTask: (idTask: string, newTitle: string, todolistId: string) => void
    changeStatusOfTask: (idTask: string, isDone: boolean, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickRemoveTaskHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.removeTask, props.task.id, props.todolistId])

    const onChangeIsDoneHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        props.changeStatusOfTask(props.task.id, newIsDoneValue, props.todolistId)
    }, [props.changeStatusOfTask, props.task.id, props.todolistId])

    const onChangeTitle = useCallback((newValue: string) => {
        props.changeTitleTask(props.task.id, newValue, props.todolistId)
    }, [props.changeTitleTask, props.task.id, props.todolistId])

    return <div className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox color={'primary'} checked={props.task.isDone} onChange={onChangeIsDoneHandler}/>
        <EditableSpan value={props.task.title} onChange={onChangeTitle}/>
        <IconButton onClick={onClickRemoveTaskHandler}><Delete/></IconButton>
    </div>
})
