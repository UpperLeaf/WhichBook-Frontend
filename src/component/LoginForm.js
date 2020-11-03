import "./LoginForm.css";

const LoginForm = () => {
    return (
        <div className="LoginForm">
            <h2 className="form-title">
                로그인
            </h2>
            <form className="login-main-form">
                <label htmlFor="email"><small>이메일</small></label>
                <input type="email" id="email" placeholder="이메일" required></input>
                <label htmlFor="password"><small>비밀번호</small></label>
                <input type="password" id="password" placeholder="비밀번호" required></input>
                <button>로그인 하기</button>
            </form>
        </div>
    )
}

export default LoginForm;
