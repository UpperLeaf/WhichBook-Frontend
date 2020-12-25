import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { getUserInfo } from "../utils/AxiosUtil";
import Axios from "axios";

const AuthNav = () => {
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            let resposne = await getUserInfo();
            setNickname(resposne.data.nickname);
            localStorage.setItem("userId", resposne.data.userId);
        };

        fetchUserInfo();
    }, []);

    return (
        <nav>
            <span className="nav-title">
                <a href="/">WhichBook</a>
            </span>
            <ul>
                안녕하세요 {nickname}님<DropdownBar></DropdownBar>
            </ul>
        </nav>
    );
};

const DropdownBar = () => {
    const { actions } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = async () => {
        const url = "http://localhost:8080/user/logout";

        const config = {
            headers: { Authorization: localStorage.getItem("refreshToken") },
        };
        let response = await Axios.get(url, config);
        if (response.status === 200) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("userId");
            actions.setIsAuthenticated(false);
            history.push("/");
        }
    };

    return (
        <div className="dropdown">
            <button className="dropbtn">
                <FontAwesomeIcon icon={faCaretDown} size="lg" />
            </button>
            <div className="dropdown-content">
                <Link to="/compose" style={{ textDecoration: "none" }}>
                    <button>리뷰 작성하기</button>
                </Link>
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
};

export default AuthNav;
