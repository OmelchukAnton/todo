import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../../App";
import {AddItemForm} from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@material-ui/icons";
import {Button} from "@material-ui/core";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string;
    tasks: TaskType[];
    removeTask: (id: string, todoListId: string) => void;
    addTask: (newTaskTitle: string, todoListId: string) => void;
    changeFilter: (value: FilterValuesType, todoListId: string) => void;
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void;
    removeTodoList: (todoListId: string) => void;
    changeTodolistTitle: (todoListId: string, newTitle: string) => void;
    filter: FilterValuesType;
}

export const TodoList = (props: PropsType) => {

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <Delete onClick={removeTodoList}/>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {props.tasks?.map((item: any) => {
                    const onRemoveHandler = () => props.removeTask(item.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeStatus(item.id, newIsDoneValue, props.id);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(item.id, newValue, props.id);
                    }

                    return <li key={item.id} className={item.isDone ? "is-done" : ''}>
                        <input type="checkbox" onChange={onChangeStatusHandler} checked={item.isDone}/>
                        <EditableSpan
                            title={item.title}
                            onChange={onChangeTitleHandler}
                        />
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

