import classes from './Login.module.css';
import {Link } from 'react-router-dom';
import Input from '../Input/Input';

const Login = function(){
    const onLoginHandler = (event) =>{
        event.preventDefault();
        console.log("Logged in");
    }

    return(
        <div className={classes.loginContainer}>
            <div className={classes.formContainer}>
            <form className={classes.login} onSubmit={onLoginHandler}>
                <Input label="Email" type="email"  />
                <Input label="Password" type="password"  />
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