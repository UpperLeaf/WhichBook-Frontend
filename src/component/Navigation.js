import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import "./Navigation.css";
import NormalNav from './NormalNav';
import AuthNav from './AuthNav';

const Navigation = () => {

    const { state } = useContext(AuthContext);

    if(state.isAuthenticated === false) {
        return (
           <NormalNav/>
        )
    }
    else {    
        return (
           <AuthNav/>
        )
    }
}

export default Navigation;

