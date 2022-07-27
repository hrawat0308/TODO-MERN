import classes from './TodoList.module.css';
import Input from '../Input/Input';
import { Fragment, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/Auth-Context';
import LoadingSpinner from '../Spinner/LoadingSpinner';
import ErrorModal from '../../Modal/ErrorModal';

const TodoList = function(props){
    
    const [enteredTodo, setEnteredTodo] = useState("");
    const [todoIsValid, setTodoIsValid] = useState(false);
    const [todoIsTouched, setTodoIsTouched] = useState(false);
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [userTodos, setUserTodos] = useState([]);
    const [error, setError] = useState();

    useEffect(()=>{
        const fetchList = async ()=>{
            try{
                setIsLoading(true);
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/${auth.userId}/todo`,{
                    method : 'GET',
                    headers : {
                        Authorization : 'Bearer ' + auth.token,
                    }
                });
                const responseData = await response.json();
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                setUserTodos((prevUserTodo)=>{
                    return [...responseData.usersTodo];
                });
            }
            catch(err){
                setIsLoading(false);
                setError(err.message);
            }
        } 
        fetchList();
    },[auth.userId, auth.token]);

    
    const todoAddHandler = async(event) =>{
        event.preventDefault();
        setTodoIsTouched(true);
        if(enteredTodo.trim() !== ""){
            setTodoIsValid(true);
            try{
                setIsLoading(true);
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/${auth.userId}/add-todo`,{
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json',
                        Authorization : 'Bearer ' + auth.token,
                    },
                    body : JSON.stringify({
                        todo : enteredTodo,
                    })
                });
                const responseData = await response.json();
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                setUserTodos((prevUserTodo)=>{
                    return [...prevUserTodo, responseData];
                });
            }
            catch(err){
                setIsLoading(false);
                setError(err.message);
            }
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

    const todoDeleteHandler = async (event) => {
        const todoId = event.target.id;
        try{
            setIsLoading(true);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/${todoId}/delete-todo`,{
                method : 'DELETE',
                headers : {
                    Authorization : 'Bearer ' + auth.token,
                },
            });
            if(!response.ok){
                throw new Error("Something went wrong!!");
            }
            setUserTodos(()=>{
                return userTodos.filter((todo)=>{
                    return todo._id !== todoId;
                });
            });
            setIsLoading(false);
        }
        catch(err){
            setIsLoading(false);
            setError(err.message);
        }
        
    }

    const errorHandler = () => {
        setError(null);
    }

    return(
        <Fragment>
        { !!error && <ErrorModal error={error} onClear={errorHandler} />} 
        <div className={classes.TodoContainer}>
            { isLoading && <LoadingSpinner asOverlay /> }
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
        { userTodos.length === 0 && <div className={classes.todoList}><p className={classes.addTaskText}>Add Some Tasks</p></div>}

            { userTodos.length !== 0 && <div className={classes.todoList}>
                { userTodos.map((entry, index)=>{
                        return(
                            <div className={classes.todo} key={entry._id}>
                                <h3 className={classes.todoContent}>{entry.todo}</h3>
                                <button id={entry._id} className={classes.todoDeleteBtn} onClick={todoDeleteHandler}>Delete</button>
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