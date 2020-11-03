import Axios from 'axios';
import React, { useState } from 'react';
import "./SignupForm.css";

const SignupForm = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");
 

    const handleClick = async () => {
        const url = 'http://localhost:8080/user/signup';
        const params = {
            email,
            password,
            passwordConfirm,
            nickname
        };
        
        const config = {
            headers: {'Content-Type' : 'application/json'}
        };
        
        console.log(JSON.stringify(params));
        try{
            let response = await Axios.post(url, JSON.stringify(params), config);
            console.log(response.data);
            console.log(response.status);
        }catch (err) {
            console.log(err.response);
        }
    }

    const onChangeEmail = e => {
        setEmail(e.target.value);
    }

    const onChangePassword = e => {
        setPassword(e.target.value);
    }

    const onChangePasswordConfirm = e => {
        setPasswordConfirm(e.target.value);
    }

    const onChangeNickname = e => {
        setNickname(e.target.value);
    }

    return (
        <div className="SignupForm">
            <h2 className="form-title">
                회원가입
            </h2>
            <form className="main-form">
                <label htmlFor="email"><small>이메일</small></label>
                <input type="email" id="email" placeholder="이메일" required onChange={onChangeEmail}></input>
                <label htmlFor="password"><small>비밀번호</small></label>
                <input type="password" id="password" placeholder="비밀번호" required onChange={onChangePassword}></input>
                <label htmlFor="password-confirm"><small>비밀번호 확인</small></label>
                <input type="password" id="password-confirm" placeholder="비밀번호" required onChange={onChangePasswordConfirm}></input>
                <label htmlFor="nickname"><small>닉네임</small></label>
                <input type="nickname" id="nickname" placeholder="닉네임" required onChange={onChangeNickname}></input>
                <button onClick={handleClick}>회원가입 하기</button>
            </form>
        </div>
    )
}

export default SignupForm;
