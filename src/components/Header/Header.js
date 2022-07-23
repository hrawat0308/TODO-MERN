import classes from './Header.module.css';
import { NavLink, Link } from 'react-router-dom';

const Header = function(props){
    
    return(
        <header className={classes.headerContainer}>
            <section className={classes.headerContentContainer}>
                <div className={classes.headerLogo}>
                    <Link to="/" className={classes.links}>TO-DO</Link>
                </div>
                <div className={classes.headerLinks}>
                    <NavLink to="/signup" className={({ isActive }) => isActive ? classes.linkIsActive : classes.links } >
                        <p>Sign Up</p>
                    </NavLink>
                </div>
            </section>
        </header>
    )
}

export default Header;