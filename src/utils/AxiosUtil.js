import Axios from "axios";

let url = "http://localhost:8080";

const checkTokenValid = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
        headers: { Authorization: accessToken },
    };
    try {
        let response = await Axios.get(url + "/auth", config);
        if (response.status === 200) {
            return true;
        }
    } catch (err) {
        return false;
    }
};

const signUpRequest = async (params) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        let response = await Axios.post(
            url + "/user/signup",
            JSON.stringify(params),
            config
        );
        return response;
    } catch (err) {
        console.log("Error in signUpRequest Method : " + err);
        return err;
    }
};

const loginRequest = async (params) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
        headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
        },
    };

    try {
        let response = await Axios.post(
            url + "/user/login",
            JSON.stringify(params),
            config
        );
        return response;
    } catch (err) {
        console.log("Error in loginRequest Method : " + err);
        return err;
    }
};

const getUserInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
        headers: {
            Authorization: accessToken,
        },
    };

    try {
        let response = await Axios.get(url + "/user/info", config);
        return response;
    } catch (err) {
        console.log("Error in getUserInfo Method : " + err);
        return err;
    }
};

const getBookList = async (title) => {
    try {
        let response = await Axios.get(url + "/book/search?title=" + title);
        return response;
    } catch (err) {
        console.log("Error in getBookInfo Method : " + err);
        return err;
    }
};

const getBookInfo = async (bookId) => {
    try {
        let response = await Axios.get(url + "/book/" + bookId);
        return response;
    } catch (err) {
        console.log("Error in getBookInfo Method : " + err);
    }
};

const composeRequest = async (title, description, bookId) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
        alert("재로그인이 필요합니다. 다시 로그인 해주세요.");
        return;
    }
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    const config = {
        headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
        },
    };

    const data = {
        bookId: bookId,
        title: title,
        description: description,
        userId: userId,
    };

    console.log(data);

    try {
        let response = await Axios.post(
            url + "/review",
            JSON.stringify(data),
            config
        );

        return response;
    } catch (err) {
        console.log("Error in composeRequest Method : " + err);
        return err;
    }
};

export {
    loginRequest,
    signUpRequest,
    checkTokenValid,
    getBookList,
    getBookInfo,
    getUserInfo,
    composeRequest,
};
