import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signUpRequest } from "../utils/AxiosUtil";

import "./SignupForm.css";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");

    const history = useHistory();

    const handleClick = async () => {
        const params = {
            email,
            password,
            passwordConfirm,
            nickname,
        };
        const response = await signUpRequest(params);
        console.log(response);
        if (response.status === 200) {
            alert("회원가입이 성공적으로 이뤄졌습니다.");
            history.push("/");
        } else {
            alert("failed to sign up");
            setPassword("");
            setPasswordConfirm("");
            setEmail("");
            setNickname("");
        }
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    };

    return (
        <div className="SignupForm">
            <h2 className="form-title">회원가입</h2>
            <form className="main-form">
                <label htmlFor="email">
                    <small>이메일</small>
                </label>
                <input
                    className="loginForm-input"
                    type="email"
                    id="email"
                    placeholder="이메일"
                    required
                    onChange={onChangeEmail}
                    value={email}
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
                    onChange={onChangePassword}
                    value={password}
                ></input>
                <label htmlFor="password-confirm">
                    <small>비밀번호 확인</small>
                </label>
                <input
                    className="loginForm-input"
                    type="password"
                    id="password-confirm"
                    placeholder="비밀번호"
                    required
                    onChange={onChangePasswordConfirm}
                    value={passwordConfirm}
                ></input>
                <label htmlFor="nickname">
                    <small>닉네임</small>
                </label>
                <input
                    className="loginForm-input"
                    type="nickname"
                    id="nickname"
                    placeholder="닉네임"
                    required
                    onChange={onChangeNickname}
                    value={nickname}
                ></input>
                <button
                    type="button"
                    className="signup-button"
                    onClick={handleClick}
                >
                    회원가입 하기
                </button>
            </form>
        </div>
    );
};

export default SignupForm;
