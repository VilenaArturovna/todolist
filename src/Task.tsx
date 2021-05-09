import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses, TaskType} from "./api/task-api";


type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (id: string, todolistId: string) => void
    changeTitleTask: (idTask: string, newTitle: string, todolistId: string) => void
    changeStatusOfTask: (idTask: string, status: TaskStatuses, todolistId: string) => void
}

export const Task = React.memo(({todolistId, task, removeTask, changeTitleTask, changeStatusOfTask}: TaskPropsType) => {
    const onClickRemoveTaskHandler = useCallback(() => removeTask(task.id, todolistId), [removeTask, task.id, todolistId])

    const onChangeIsDoneHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        changeStatusOfTask(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.InProgress, todolistId)
    }, [changeStatusOfTask, task.id, todolistId])

    const onChangeTitle = useCallback((newValue: string) => {
        changeTitleTask(task.id, newValue, todolistId)
    }, [changeTitleTask, task.id, todolistId])

    return <div className={task.status ? 'is-done' : ''}>
        <Checkbox color={'primary'} checked={!!task.status} onChange={onChangeIsDoneHandler}/>
        <EditableSpan value={task.title} onChange={onChangeTitle}/>
        <IconButton onClick={onClickRemoveTaskHandler}><Delete/></IconButton>
    </div>
})
