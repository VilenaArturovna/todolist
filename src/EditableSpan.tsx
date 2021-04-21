import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const changeTitleValue = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode ?
        <TextField size={'small'} variant={'outlined'} value={title} autoFocus onChange={changeTitleValue} onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
}