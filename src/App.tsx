import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList/TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./components/TodoList/AddItemForm";
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | 'completed' | "active";

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const removeTask = (id: string, todoListId: string) => {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter((t) => t.id !== id);
        tasksObj[todoListId] = filteredTasks

        setTasks({...tasksObj});
    }

    const addTask = (title: string, todoListId: string) => {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListId];
        let newTasks = [task, ...tasks];
        // let newTasks = [newTask, ...tasks];
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
        {id: todoListId1, title: "what to learn", filter: "all"},
        {id: todoListId2, title: "what to buy", filter: "all"}
    ]);

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "Rest api", isDone: true},
            {id: v1(), title: "GraphjQL", isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: "book", isDone: false},
            {id: v1(), title: "course", isDone: true}
        ]
    })

    function addTodoList(title: string) {
        let todoList: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([todoList, ...todoLists])

        setTasks({
            ...tasksObj,
            [todoList.id]: []
        })
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let tasks = tasksObj[todoListId];

        let findTask = tasks.find(t => t.id === taskId);

        if (findTask) {
            findTask!.isDone = isDone;
            setTasks({...tasksObj});
        }

    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        // достаём нужный массив по todoListId
        let tasks = tasksObj[todoListId];
        // найдём новую таску
        let findTask = tasks.find(t => t.id === taskId);
        // изменим таску, если она нашлась
        if (findTask) {
            findTask!.title = newTitle;
            // засетим в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasksObj});
        }

    }

    const removeTodoList = (todoListId: string) => {
        let filterTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filterTodoList);
        delete tasksObj[todoListId];
        setTasks(tasksObj);
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todoLists.find(tl => tl.id !== id);
        if (todolist) {
            todolist.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Menu/>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                {
                    todoLists.map((tl: TodolistType) => {
                        let tasksForTodoList = tasksObj[tl.id];

                        if (tl.filter === "completed") {
                            tasksForTodoList = tasksForTodoList?.filter(t => t.isDone === true);
                        }

                        if (tl.filter === "active") {
                            tasksForTodoList = tasksForTodoList?.filter(t => t.isDone === false);
                        }

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeFilter={changeFilter}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
