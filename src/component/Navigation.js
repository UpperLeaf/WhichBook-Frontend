import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import "./Navigation.css";

const Navigation = () => {

    const { state } = useContext(AuthContext);
    
    console.log(state.isAuthenticated);
    if(state.isAuthenticated === false) {
        return (
            <nav>
                <span className="nav-title">
                    <a href="/">WhichBook</a>
                </span>
                <ul>
                    <li>
                        <a href="/login">로그인</a>
                        <a href="/signup">회원가입</a>
                    </li>
                </ul>
            </nav>
        )
    }
    else {
        console.log(state.isAuthenticated);
        return (
        <nav>
            <span className="nav-title">
                <a href="/">WhichBook</a>
            </span>
            <ul>
                <li>
                    환영합니다.
                </li>
            </ul>
        </nav>
        )
    }
}

export default Navigation;

