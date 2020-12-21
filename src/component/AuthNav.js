import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Axios from "axios";

const AuthNav = () => {
    const [nickname, setNickName] = useState("");

    useEffect(() => {
        const url = "http://localhost:8080/user/info";
        const config = {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            },
        };
        let response;
        async function fetchData() {
            response = await Axios.get(url, config);
            setNickName(response.data.nickname);
        }
        fetchData();
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
