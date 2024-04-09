import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemPropsType = {
    addItem: (newTaskTitle: string) => void;
}

export function AddItemForm(props: AddItemPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState(false);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.charCode === 13) {
            newTask();
        }
    }

    const newTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError(true);
        }
    }

    return <div>
        <TextField
            value={newTaskTitle}
            variant={"outlined"}
            label={"Type value"}
            type="text"
            onChange={onNewTitleChangeHandler}
            onKeyPress={onChangeHandler}
            error={!!error}
            helperText={error && 'Filed is required'}
        />
        <ControlPoint onClick={newTask} color={'primary'} />
    </div>
}