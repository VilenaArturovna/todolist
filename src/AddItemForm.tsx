import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm')
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const addItemUsingEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null) //ошибка будет пропадать при наборе текста
        if (e.key === 'Enter') addItem()
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return <div>
        <TextField size={'small'}
                   variant={'outlined'}
                   value={title}
                   onChange={changeTitle}
                   onKeyPress={addItemUsingEnterKey}
                   error={!!error}  //добавляет красную рамку на инпут
                   helperText={error}  //текст при ошибке
                   label={'Title'}  //placeholder, красиво поднимающийся выше при вводе текста
        />
        <IconButton onClick={addItem} color={'primary'}>
            <AddBox />
        </IconButton>

    </div>
})