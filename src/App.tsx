import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from 'uuid';

export type FilterValuesType = "all" | 'completed' | "active";

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    const removeTask = (id: string, todoListId: string) => {
        let tasks = tasksObj[todoListId];

        let filteredTasks = tasks.filter((t) => t.id !== id);
        tasksObj[todoListId] = filteredTasks

        setTasks({...tasksObj});
    }

    const addTask = (title: string, todoListId: string) => {
        let tasks = tasksObj[todoListId];

        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        tasksObj[todoListId] = newTasks

        setTasks({...tasksObj});
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: "what to learn", filter: "active"},
        {id: todoListId2, title: "what to buy", filter: "completed"}
    ]);

    let [tasksObj, setTasks] = useState({
        [todoListId1]: [{id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "Rest api", isDone: true},
            {id: v1(), title: "GraphjQL", isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: "book", isDone: false},
            {id: v1(), title: "course", isDone: true}
        ]
    })

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let tasks = tasksObj[todoListId];

        let findTask = tasks.find(t => t.id === taskId);

        if(findTask) {
            findTask!.isDone = isDone;
            setTasks({...tasksObj});
        }

    }

    const removeTodoList = (todoListId: string) => {
        let filterTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filterTodoList);
        delete tasksObj[todoListId];
        setTasks(tasksObj);
    }

    return (
        <div className="App">
            <input /> <button>x</button>
            {
                todoLists.map((tl: TodolistType) => {
                    let tasksForTodoList = tasksObj[tl.id];

                    if (tl.filter === "completed") {
                        tasksForTodoList = tasksForTodoList?.filter(t => t.isDone === true);
                    }

                    if (tl.filter === "active") {
                        tasksForTodoList = tasksForTodoList?.filter(t => t.isDone === false);
                    }

                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        changeFilter={changeFilter}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                })
            }
        </div>
    );
}

export default App;
