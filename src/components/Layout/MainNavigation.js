import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext)
console.log(authCtx.isLoggedIn)
  const logoutHandler = () => {
    authCtx.onLogout();
    history.replace('./auth')

  }

 
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
         {!authCtx.isLoggedIn && (<li>
            <Link to='/auth'>Login</Link>
          </li> )}
          {authCtx.isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li> }
         {authCtx.isLoggedIn && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li> }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
