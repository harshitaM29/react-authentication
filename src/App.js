import { Switch, Route, Redirect } from 'react-router-dom';
import AuthContext from './store/auth-context';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContextProvider from './store/AuthContextProvider';
import { useContext } from 'react';

function App() {
  const authCtx = useContext(AuthContext)
  console.log(authCtx.isLoggedIn);
  return (
    <AuthContextProvider>
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && <Route path='/auth'>
          <AuthPage />
        </Route> }
        <Route path='/profile'>
         {!authCtx.isLoggedIn && <UserProfile />} 
         {authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route> 
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
    </AuthContextProvider>
  );
}

export default App;
