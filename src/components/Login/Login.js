import classes from './Login.module.css';
import {Link } from 'react-router-dom';
import Input from '../Input/Input';
import { useState, useContext, Fragment } from 'react';
import { AuthContext } from '../../Context/Auth-Context';
import LoadingSpinner from '../Spinner/LoadingSpinner';
import ErrorModal from '../../Modal/ErrorModal';
   
const Login = function(){
    const auth = useContext(AuthContext);
    const [enteredPassword, setEnteredPassword] = useState(""); 
    const [enteredEmail, setEnteredEmail] = useState(""); 
    const [emailIsTouched, setEmailIsTouched] = useState(false);
    const [passwordIsTouched, setPasswordIsTouched] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    

    const onLoginHandler = async (event) =>{
        event.preventDefault();
        setEmailIsTouched(true);
        setPasswordIsTouched(true);
        if(enteredPassword.trim().length >= 6 ){
            setPasswordIsValid(true);
        }
        else{
            setPasswordIsValid(false);
            return;
        }
        if(enteredEmail.trim().includes('@')){
            setEmailIsValid(true);
        }
        else{
            setEmailIsValid(false);
            return;
        }
        
        try{
            setIsLoading(true);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/login',{
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    email : enteredEmail,
                    password: enteredPassword,
                })
            });
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            setIsLoading(false);
            auth.login(responseData.user, responseData.token);
        }
        catch(err){
            console.log(err);
            setIsLoading(false);
            setError(err.message || 'Something Went Wrong!!');
        }
    }

    const emailInputOnchange = (event)=>{
        setEnteredEmail(event.target.value);
        if(event.target.value.trim().includes('@')){
            setEmailIsValid(true);
        }else{
            setEmailIsValid(false);
        }
    }

    const passwordInputOnchange = (event) =>{
        setEnteredPassword(event.target.value);
        if(event.target.value.trim().length >= 6 ){
            setPasswordIsValid(true);
        }
        else{
            setPasswordIsValid(false);
        }
    }

    const emailBlur = ()=>{
        setEmailIsTouched(true);
        if(enteredEmail.trim().includes('@')){
            setEmailIsValid(true);
        }
    }

    const passwordBlur = ()=>{
        setPasswordIsTouched(true);
        if(enteredPassword.trim().length >= 6 ){
            setPasswordIsValid(true);
        }
    }
    const errorHandler = () => {
        setError(null);
    }

    return(
        <Fragment>
        { !!error && <ErrorModal error={error} onClear={errorHandler} />}
        <div className={classes.loginContainer}>
            { isLoading && <LoadingSpinner asOverlay />}
            <div className={classes.formContainer}>
            <form className={classes.login} onSubmit={onLoginHandler}>
                <Input  label="Email" 
                        type="email" 
                        onContentChange={emailInputOnchange}  
                        value={enteredEmail} 
                        onInputBlur={emailBlur}
                />
                { emailIsTouched && !emailIsValid && <p className={classes.invalidInput}>Enter a Valid Email Address!!</p> }
                <Input  label="Password" 
                        type="password" 
                        onContentChange={passwordInputOnchange} 
                        value={enteredPassword}
                        onInputBlur={passwordBlur} 
                />
                { passwordIsTouched && !passwordIsValid && <p className={classes.invalidInput}>Password must be atleast 6 characters long!!</p> }
                <button type='submit' className={classes.loginSubmitBtn}>Login</button>
            </form>
            <hr className={classes.ruler}></hr>
            <div className={classes.newUserContainer}>
                <p>New User ? <Link to="/signup">Register Here</Link></p>
            </div>
            </div>
        </div>
        </Fragment>
        );
    
}

export default Login;