class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.access_token;
        // return user?.refreshToken;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        // return user?.accessToken;
        return user?.access_token;
    }

    updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("user"));
        // user.accessToken = token;
        user.access_token = token;
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    setUser(user) {
        console.log(JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("user");
    }
}

export default new TokenService();