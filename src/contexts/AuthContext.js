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
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
