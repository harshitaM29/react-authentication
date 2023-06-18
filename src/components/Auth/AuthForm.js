import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history =  useHistory()

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    

  
  };
  let content = <p>Sending Request...</p>

  const signUpHandler = (e) => {

    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const signUpData = {
      email:enteredEmail,
      password:enteredPassword,
      returnSecureToken: true
    }
    setIsLoading(true);
    if(isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6MT_tbfGikKtW8VXzNYWGBHUVzV8f8z4', {
        method: 'POST',
        body:JSON.stringify(signUpData),
        headers: {
          'Content-Type' : 'application/json'
        }

      }).then(res => {
        setIsLoading(false)
        if(res.ok) {
          res.json().then(data => {
            authCtx.onLogin(data)
            history.replace('/')
          });
        } else {
          res.json().then(data => {
            alert(data.error.message)
            })
        }
      })

    }else{
      
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6MT_tbfGikKtW8VXzNYWGBHUVzV8f8z4', {
        method:'POST',
        body:JSON.stringify(signUpData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        setIsLoading(false);
        if(res.ok) {

        } else{
          res.json().then(data => {
          alert(data.error.message)
          })
        }
      })
    }
  
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={signUpHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {isLoading && <p>Sending Request...</p>}
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button> }
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
