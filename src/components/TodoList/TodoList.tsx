import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../../App";

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
    filter: FilterValuesType;
    removeTodoList: (todoListId: string) => void
}

export const TodoList = (props: PropsType) => {

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const onSubmitHandler = () => {
        props.removeTodoList(props.id);
    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onSubmitHandler}>x</button>
            </h3>
            <AddItemForm newTask={props.addTask} id={props.id}/>
            <ul>
                {props.tasks?.map((item: any) => {
                    const onRemoveHandler = () => props.removeTask(item.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(item.id, e.currentTarget.checked, props.id);

                    return <li key={item.id} className={item.isDone ? "is-done" : ''}>
                        <input type="checkbox" onChange={onChangeHandler} checked={item.isDone}/>
                        <span>{item.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

type AddItemPropsType = {
    newTask: (newTaskTitle: string, todoListId: string) => void;
    id: string;
}

function AddItemForm(props: AddItemPropsType) {
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
            props.newTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle("");
        } else {
            setError(true);
        }
    }

    return <div>
        <input
            value={newTaskTitle}
            type="text"
            onChange={onNewTitleChangeHandler}
            onKeyPress={onChangeHandler}
            className={error ? "error" : ""}
        />
        <button onClick={newTask}>+</button>
        {error ? <div className="error-message">Filed is required</div> : null}
    </div>
}