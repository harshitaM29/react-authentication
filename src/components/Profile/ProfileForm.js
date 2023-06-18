import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom'

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const passwordInputRef = useRef();

  const changePasswordHandler = (e) => {
    e.preventDefault();
    const enteredPassword = passwordInputRef.current.value;
    const token = authCtx.tokenId;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC6MT_tbfGikKtW8VXzNYWGBHUVzV8f8z4',{
      method: 'POST',
      body:JSON.stringify({
        idToken:token,
        password: enteredPassword,
        returnSecureToken:true

      })
    }).then(res => {
      alert('Password Changed Successfully');
      history.replace('/auth')
    })

  }
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        <button onClick={changePasswordHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
