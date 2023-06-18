import React from "react";

const AuthContext = React.createContext({
    tokenId: '',
    isLoggedIn:false,
    onLogin:(token) => {},
    onLogout:() => {}
});

export default AuthContext;

