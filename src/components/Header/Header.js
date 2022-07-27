import classes from './Header.module.css';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../../Context/Auth-Context';
import { useContext } from 'react';

const Header = function(props){
    const auth = useContext(AuthContext);

    const logoutHandler = () => {
        auth.logout();
    }

    return(
        <header className={classes.headerContainer}>
            <section className={classes.headerContentContainer}>
                <div className={classes.headerLogo}>
                    <Link to="/" className={classes.links}>My TODO's</Link>
                </div>
                { !auth.isLoggedIn && 
                <div className={classes.headerLinks}>
                    <NavLink to="/signup" className={({ isActive }) => isActive ? classes.linkIsActive : classes.links } >
                        <p>Sign Up</p>
                    </NavLink>
                </div>
                }
                {
                auth.isLoggedIn && 
                <div className={classes.headerLinks}>
                    <NavLink to="/" className={({ isActive }) => isActive ? classes.linkIsActive : classes.links } >
                        <p onClick={logoutHandler}>Logout</p>
                    </NavLink>
                </div>
                }
            </section>
        </header>
    )
}

export default Header;