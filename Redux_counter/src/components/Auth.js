import { useDispatch, useSelector } from 'react-redux';
import classes from './Auth.module.css';
import { login } from '../store/authSlice';

const Auth = () => {
  const isAuth = useSelector(state => state.authentication.isAuthenticated);
  const dispatch = useDispatch();

  function handleSubmit(e){

    const formData = new FormData(e.target),
    email = formData.get("email"),
    password = formData.get("password")
    console.log("formData",{email,password});
    dispatch(login());
    e.preventDefault();
  }

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handleSubmit}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' name="email" id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' />
          </div>
          <button type='submit'>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
