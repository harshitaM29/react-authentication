import { useState } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider = props => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tokenId, setToken] = useState(null);
    const loginHandler = (data) => {
        
        setToken(data.idToken);
        setIsLoggedIn(true);
   
    }
    console.log(isLoggedIn)

    const logoutHandler = () => {
        setToken(null);
        setIsLoggedIn(false);
    }
console.log(tokenId)
    const authContext = {
        tokenId:tokenId,
        isLoggedIn:isLoggedIn,
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

