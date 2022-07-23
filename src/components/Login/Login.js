import classes from './Login.module.css';
import {Link } from 'react-router-dom';
import Input from '../Input/Input';
import { useState } from 'react';

const Login = function(){

    const [enteredPassword, setEnteredPassword] = useState(""); 
    const [enteredEmail, setEnteredEmail] = useState(""); 
    const [emailIsTouched, setEmailIsTouched] = useState(false);
    const [passwordIsTouched, setPasswordIsTouched] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);

    const onLoginHandler = (event) =>{
        event.preventDefault();
        setEmailIsTouched(true);
        setPasswordIsTouched(true);
        if(enteredPassword.trim().length >= 6 ){
            setPasswordIsValid(true);
        }
        else{
            setPasswordIsValid(false);
        }
        if(enteredEmail.trim().includes('@')){
            setEmailIsValid(true);
        }
        else{
            setEmailIsValid(false);
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

    return(
        <div className={classes.loginContainer}>
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
    )
}

export default Login;