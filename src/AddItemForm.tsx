import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

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
        setError(null) //ошибка будет пропадать при наборе текста
        if (e.key === 'Enter') addItem()
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return <div>
        <input value={title}
               onChange={changeTitle}
               onKeyPress={addItemUsingEnterKey}
               className={error ? 'error' : ''}/>
        <button onClick={addItem}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
}