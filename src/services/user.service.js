// import axios from 'axios'
// import authHeader from "./auth-header"
import api from "./api"

// const API_URL = 'http://school-management-api.test/api/'

class UserService {
    getPublicContent() {
        // return axios.get(API_URL+'all')
        return api.get('/test/all');
    }

    getUserSuperAdminBoard() {
        // return axios.get(API_URL+'superadmin/dashboard', { headers: authHeader() })
        // return axios.get(API_URL+'superadmin/dashboard')
        return api.get('superadmin/dashboard');
    }

    getUserBoard() {
        // return axios.get(API_URL+'user', { headers: authHeader() })
        return api.get('/test/user')
    }

    getModeratorBoard() {
        // return axios.get(API_URL+'mod', { headers: authHeader() })
        return api.get('/test/mod')
    }

    getAdminBoard() {
        // return axios.get(API_URL+'admin', { headers: authHeader() })
        return api.get('/test/admin')
    }
}

export default new UserService();