import { useState } from "react";
import AuthContext from "./auth-context";
import { useHistory } from 'react-router-dom'
import HomePage from "../pages/HomePage";
const AuthContextProvider = props => {
    const history = useHistory();
    const token = localStorage.getItem("token")
   
    
    const [tokenId, setToken] = useState(token);
    const isUserLoggedIn = !!tokenId;
    const loginHandler = (data) => {
        setToken(data.idToken);
        localStorage.setItem("token",data.idToken)

        setTimeout(() => {
            alert('Login again');
            logoutHandler();
        },6000)
        
   
    }
  

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token")
       
     
    }

    const authContext = {
        tokenId:tokenId,
        isLoggedIn:isUserLoggedIn,
        onLogin:loginHandler,
        onLogout:logoutHandler
    }
  
    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )

};

export default AuthContextProvider;

