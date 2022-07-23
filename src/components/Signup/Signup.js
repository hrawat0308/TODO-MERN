import classes from './Signup.module.css';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';

const Signup = function(props){

    const onSignupHandler = (event) =>{
        event.preventDefault();
        console.log("form submitted");
    }
 
    return(
        <div className={classes.signupContainer}>
            <div className={classes.formContainer}>
            <form className={classes.signup} onSubmit={onSignupHandler}>
                <Input label="Name" type="text" />
                <Input label="Email" type="email"  />
                <Input label="Password" type="password"  />
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