import { AuthProvider } from '../contexts/AuthContext';
import Router from '../router/AuthRoute';

const App = () => {
    return (
        <AuthProvider>
            <div>
                <Router />
            </div>
        </AuthProvider>
    );
}

export default App;
