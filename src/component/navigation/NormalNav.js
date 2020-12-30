const NormalNav = () => {
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

export default NormalNav;