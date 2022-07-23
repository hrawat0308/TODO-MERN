import { Fragment } from "react";
import classes from './Input.module.css';

const Input = function(props){
    return(
       <Fragment>
            <label className={classes.label}>{props.label}</label>
            <input className={classes.input} type={props.type}  />
       </Fragment> 
    )
}

export default Input;