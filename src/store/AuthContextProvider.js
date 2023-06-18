import { useState } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider = props => {
    const token = localStorage.getItem("token")
    
    const [tokenId, setToken] = useState(token);
    const isUserLoggedIn = !!tokenId;
    const loginHandler = (data) => {
        
        localStorage.setItem("token",data.idToken)
        setToken(data.idToken);
      
   
    }
  

    const logoutHandler = () => {
        localStorage.removeItem("token")
        setToken(null);
     
    }

    const authContext = {
        tokenId:tokenId,
        isLoggedIn:isUserLoggedIn,
        onLogin:loginHandler,
        onLogout:logoutHandler
    }
    console.log(authContext.isLoggedIn)

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )

};

export default AuthContextProvider;

