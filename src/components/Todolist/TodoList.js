import classes from './TodoList.module.css';
import Input from '../Input/Input';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router';

const Dummy_todo = [
    {   
        content : "Task1",
        user : {
            id : "u1"
        }
    },
    {
        content : "Task2",
        user : {
            id : "u1"
        }
    },
    {
        content : "Task3",
        user : {
            id : "u1"
        }
    },
    {
        content : "Task2",
        user : {
            id : "u2"
        }
    },
    {
        content : "Task3",
        user : {
            id : "u2"
        }
    },
];


const TodoList = function(props){
    const params = useParams();
    const [enteredTodo, setEnteredTodo] = useState("");
    const [todoIsValid, setTodoIsValid] = useState(false);
    const [todoIsTouched, setTodoIsTouched] = useState(false);
    const findUserTodo = Dummy_todo.filter((entry)=>{
        if(entry.user.id === params.userId){
            return entry;
        }
    });
    const [userTodos, setUserTodos] = useState(findUserTodo);
    

    const todoAddHandler = (event) =>{
        event.preventDefault();
        setTodoIsTouched(true);
        if(enteredTodo.trim() !== ""){
            setTodoIsValid(true);
            Dummy_todo.push({
                content : enteredTodo,
                user : {
                    id : params.userId
                }
            });
            const findUserTodo = Dummy_todo.filter((entry)=>{
                if(entry.user.id === params.userId){
                    return entry;
                }
            });
            setUserTodos(findUserTodo);
            setEnteredTodo("");
        }else{
            setTodoIsValid(false);
        }
    }

    const onChangeTodoHandler = (event) => {
        setEnteredTodo(event.target.value);
        if(event.target.value.trim() !== ""){
            setTodoIsValid(true);
        }else{
            setTodoIsValid(false);
        }
    }

    const onBlurTodoHandler = (event)=>{
        setTodoIsTouched(true);
        if(enteredTodo.trim() !== ""){
            setTodoIsValid(true);
        }
    }

    const todoDeleteHandler = (event) => {
        console.log(event.target.id)
        console.log(userTodos);
        setUserTodos((prevState)=>{
            return prevState.filter((entry, index)=>{
                if(index !== event.target.id){
                    return entry;
                }
            });
        });
    }

    return(
        <Fragment>
        <div className={classes.TodoContainer}>
            <div className={classes.TodoInputContainer}>
                <Input  label="Enter your today's Tasks" 
                        type="text" 
                        maxLength="80" 
                        value={enteredTodo}
                        onContentChange={onChangeTodoHandler}
                        onInputBlur={onBlurTodoHandler}        
                />
                { todoIsTouched && !todoIsValid && <p className={classes.invalidInput}>Task cannot be Empty !!</p>}
                <button className={classes.todoAddBtn} onClick={todoAddHandler}>Add</button>
            </div>
        </div>
        <div className={classes.TodoContainer}>
            { userTodos.length !== 0 && <div className={classes.todoList}>
                { userTodos.map((entry, index)=>{
                        return(
                            <div className={classes.todo} key={index}>
                                <h3 className={classes.todoContent}>{entry.content}</h3>
                                <button id={index} className={classes.todoDeleteBtn} onClick={todoDeleteHandler}>Delete</button>
                            </div> 
                        )
                    }) 
                } 
            </div>}
        </div>
        </Fragment>
    )
}

export default TodoList;