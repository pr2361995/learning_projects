import { useDispatch, useSelector } from 'react-redux';
import classes from './Header.module.css';
import { logOut,login } from '../store/authSlice';


const Header = () => {
  const isAuth = useSelector(state => state.authentication.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {
        isAuth && 
        <nav>
          <ul>
            <li>
              <a href='/'>My Products</a>
            </li>
            <li>
              <a href='/'>My Sales</a>
            </li>
            <li>
              <button onClick={() => dispatch(logOut()) }>Logout</button>
            </li>
          </ul>
        </nav>
      }
    </header>
  );
};

export default Header;
