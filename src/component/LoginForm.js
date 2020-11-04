import Axios from 'axios';
import { useState, useContext }  from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

import "./LoginForm.css";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { state, actions } = useContext(AuthContext);

    const history = useHistory();

    
    const onEmailChanged = e => {
        setEmail(e.target.value);
    }

    const onPasswordChanged = e => {
        setPassword(e.target.value);
    }

    const handleClick = async () => {
        const url = 'http://localhost:8080/user/login';
        const params = {
            email,
            password
        };
        
        const config = {
            headers: {'Content-Type' : 'application/json'}
        };
        
        try{
            let response = await Axios.post(url, JSON.stringify(params), config);
            
            if(response.status === 200) {
                actions.setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                history.push('/');
            }
        }catch (err) {
            alert("failed to login");
            console.log(err);
            setPassword("");
        }
    }

    return (
        <div className="LoginForm">
            <h2 className="form-title">
                로그인
            </h2>
            <form className="login-main-form">
                <label htmlFor="email"><small>이메일</small></label>
                <input type="email" id="email" placeholder="이메일" required value={email} onChange={onEmailChanged}></input>
                <label htmlFor="password"><small>비밀번호</small></label>
                <input type="password" id="password" placeholder="비밀번호" required value={password} onChange={onPasswordChanged}></input>
                <button type="button" onClick={handleClick}>로그인 하기</button>
            </form>
        </div>
    )
}

export default LoginForm;
