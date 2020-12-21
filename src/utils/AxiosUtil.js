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
        alert("network error");
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
        alert("network error");
    }
};

const getBookList = async (title) => {
    try {
        let response = await Axios.get(url + "/book/search?title=" + title);
        return response;
    } catch (err) {
        console.log("Error" + err);
        return err;
    }
};

export { loginRequest, signUpRequest, checkTokenValid, getBookList };
