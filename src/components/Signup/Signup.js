import classes from './Signup.module.css';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Signup = function(props){

    const [enteredPassword, setEnteredPassword] = useState(""); 
    const [enteredEmail, setEnteredEmail] = useState(""); 
    const [enteredName, setEnteredName] = useState("");
    const [emailIsTouched, setEmailIsTouched] = useState(false);
    const [passwordIsTouched, setPasswordIsTouched] = useState(false);
    const [nameIsTouched, setNameIsTouched] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [nameIsValid, setNameIsValid] = useState(false);

    const onSignupHandler = (event) =>{
        event.preventDefault();
        setEmailIsTouched(true);
        setPasswordIsTouched(true);
        setNameIsTouched(true);
        if(enteredPassword.trim().length >= 6 ){
            setPasswordIsValid(true);
        }
        if(enteredEmail.trim().includes('@')){
            setEmailIsValid(true);
        }
        if(enteredName.trim() !== ""){
            setNameIsValid(true);
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

    const nameInputOnchange = (event)=>{
        setEnteredName(event.target.value);
        if(event.target.value.trim() !== "" ){
            setNameIsValid(true);
        }
        else{
            setNameIsValid(false);
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

    const nameBlur = () =>{
        setNameIsTouched(true);
        if(enteredName.trim() !== "" ){
            setNameIsValid(true);
        }
    }
 
    return(
        <div className={classes.signupContainer}>
            <div className={classes.formContainer}>
            <form className={classes.signup} onSubmit={onSignupHandler}>
                <Input  label="Name" 
                        type="text"
                        onContentChange={nameInputOnchange}  
                        value={enteredName} 
                        onInputBlur={nameBlur} 
                />
                { nameIsTouched && !nameIsValid && <p className={classes.invalidInput}>Please Enter a Name !!</p> }
                <Input  label="Email" 
                        type="email"
                        onContentChange={emailInputOnchange}  
                        value={enteredEmail} 
                        onInputBlur={emailBlur}   
                />
                { emailIsTouched && !emailIsValid && <p className={classes.invalidInput}>Please Enter valid Email address !!</p> }
                <Input  label="Password" 
                        type="password"  
                        onContentChange={passwordInputOnchange} 
                        value={enteredPassword}
                        onInputBlur={passwordBlur}        
                />
                { passwordIsTouched && !passwordIsValid && <p className={classes.invalidInput}>Password must be atleast 6 characters long!! !!</p> }
                <button type='submit' className={classes.signupSubmitBtn}>Sign Up</button>
            </form>
            <hr className={classes.ruler}></hr>
            <div className={classes.alreadyRegisteredContainer}>
                <p>Already Registered ? <Link to="/">Login Here</Link></p>
            </div>
            </div>
        </div>
    )
}

export default Signup;