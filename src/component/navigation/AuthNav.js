import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { getUserInfo, logoutRequest } from "../../utils/AxiosUtil";

const AuthNav = () => {
    const [nickname, setNickname] = useState("");
    const history = useHistory();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                let resposne = await getUserInfo();
                setNickname(resposne.data.nickname);
                localStorage.setItem("userId", resposne.data.userId);
            } catch (err) {
                await logoutRequest(history);
            }
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
    const [clickedDropdownBtn, setClickedDropdownbtn] = useState(false);
    const history = useHistory();

    const handleLogout = async () => {
        let response = await logoutRequest();
        actions.setIsAuthenticated(false);
        actions.setUser(undefined);
        history.push("/");
    };

    const handleOnClick= () => {
        setClickedDropdownbtn(!clickedDropdownBtn);
    }

    return (
        <div className="dropdown">
            <button onClick={handleOnClick}className="dropbtn">
                <FontAwesomeIcon icon={faCaretDown} size="lg" />
            </button>
            <div className={`dropdown-content ${clickedDropdownBtn && 'active'}`}>
                <Link to="/compose" style={{ textDecoration: "none" }}>
                    <button>리뷰 작성하기</button>
                </Link>
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
};

export default AuthNav;
