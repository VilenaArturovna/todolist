import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo(({value, onChange, disabled = false}: EditableSpanPropsType) => {
    console.log('EditableSpan')
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        onChange(title)
    }

    const changeTitleValue = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode ?
        <TextField size={'small'} variant={'outlined'} value={title} autoFocus onChange={changeTitleValue} onBlur={activateViewMode} disabled={disabled}/>
        : <span onDoubleClick={activateEditMode}>{value}</span>
})