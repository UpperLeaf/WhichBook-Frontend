import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import "./Navigation.css";

const Navigation = () => {

    const { state } = useContext(AuthContext);
    
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
        return (
        <nav>
            <span className="nav-title">
                <a href="/">WhichBook</a>
            </span>
            <ul>
                안녕하세요
                <DropdownBar></DropdownBar>
            </ul>
        </nav>
        )
    }
}

const DropdownBar = () => {

    const { actions } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("isAuthenticated");
        actions.setIsAuthenticated(false);
    }   

    return (
        <div className="dropdown">
            <button className="dropbtn">
                <FontAwesomeIcon icon={faCaretDown} size="lg"/>
            </button>
            <div className="dropdown-content">
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    )
}

export default Navigation;

