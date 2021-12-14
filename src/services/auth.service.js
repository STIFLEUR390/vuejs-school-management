// import axios from 'axios';
// const API_URL = 'http://school-management-api.test/api/auth/';

import api from './api';
import TokenService from './token-service'

class AuthService {
    /*login(user) {
        return axios
            .post(API_URL + 'login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }*/
    login({ email, password }){
        return api.post('/auth/login', {
            email,
            password
        })
            .then((response) => {
                if (response.data.access_token) {
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    /*logout() {
        localStorage.removeItem('user');
    }*/
    logout() {
        TokenService.removeUser();
    }

    /*register(user) {
        return axios.post(API_URL + 'register', {
            username: user.username,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
        });
    }*/
    register({ username, email, password, password_confirmation }) {
        return api.post('/auth/register', {
            username,
            email,
            password,
            password_confirmation
        });
    }
}

export default new AuthService();