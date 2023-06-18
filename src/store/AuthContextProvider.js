import { useState } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider = props => {
    const token = localStorage.getItem("token")
    
    const [tokenId, setToken] = useState(token);
    const isUserLoggedIn = !!tokenId;
    const loginHandler = (data) => {
        setToken(data.idToken);
        localStorage.setItem("token",data.idToken)
        
      
   
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

