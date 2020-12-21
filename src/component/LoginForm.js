import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { loginRequest } from "../utils/AxiosUtil";

import "./LoginForm.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { actions } = useContext(AuthContext);

    const history = useHistory();

    const onEmailChanged = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChanged = (e) => {
        setPassword(e.target.value);
    };

    const handleClick = async () => {
        const params = {
            email,
            password,
        };

        const response = await loginRequest(params);
        if (response.status === 200) {
            actions.setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            history.push("/");
        } else {
            alert("failed to login");
            setPassword("");
        }
    };

    return (
        <div className="LoginForm">
            <h2 className="form-title">로그인</h2>
            <form className="login-main-form">
                <label htmlFor="email">
                    <small>이메일</small>
                </label>
                <input
                    className="loginForm-input"
                    type="email"
                    id="email"
                    placeholder="이메일"
                    required
                    value={email}
                    onChange={onEmailChanged}
                ></input>
                <label htmlFor="password">
                    <small>비밀번호</small>
                </label>
                <input
                    className="loginForm-input"
                    type="password"
                    id="password"
                    placeholder="비밀번호"
                    required
                    value={password}
                    onChange={onPasswordChanged}
                ></input>
                <button
                    type="button"
                    className="login-button"
                    onClick={handleClick}
                >
                    로그인 하기
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
