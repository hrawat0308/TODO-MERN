import { Fragment } from "react";
import classes from './Input.module.css';

const Input = function(props){
    return(
       <Fragment>
            <label htmlFor={props.label} className={classes.label}>{props.label}</label>
            <input  id={props.label}
                    className={classes.input} 
                    type={props.type} 
                    maxLength={props.maxLength ? props.maxLength : ""} 
                    value={props.value}
                    onChange={props.onContentChange}
                    onBlur={props.onInputBlur} 
            />
       </Fragment> 
    )
}

export default Input;