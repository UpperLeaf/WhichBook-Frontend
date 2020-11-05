import Axios from 'axios';
import { createContext, useState } from 'react';

const AuthContext = createContext({
    state: {
        user: null,
        isAuthenticated: false
    },
    actions: {
        setUser: () => {},
        setIsAuthenticated: () => {}
    }
});

const AuthProvider = ({children}) => {
    let localUser = localStorage.getItem('user');
    let localIsAuthenticated = localStorage.getItem('isAuthenticated');
    
    if(localIsAuthenticated === null){
        localIsAuthenticated = false;
    }
    
    const [user, setUser] = useState(localUser);
    const [isAuthenticated, setIsAuthenticated] = useState(localIsAuthenticated);

    const value = {
        state: { user, isAuthenticated },
        actions: {setUser, setIsAuthenticated}
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

const { Consumer: AuthConsumer } = AuthContext; 

export { AuthProvider, AuthConsumer };

export default AuthContext;
