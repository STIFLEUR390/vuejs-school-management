import axios from 'axios'
import authHeader from "./auth-header"

const API_URL = 'http://school-management-api.test/api/'

class UserService {
    getPublicContent() {
        return axios.get(API_URL+'all')
    }

    getUserSuperAdminBoard() {
        // return axios.get(API_URL+'superadmin/dashboard', { headers: authHeader() })
        return axios.get(API_URL+'superadmin/dashboard')
    }

    getUserBoard() {
        return axios.get(API_URL+'user', { headers: authHeader() })
    }

    getModeratorBoard() {
        return axios.get(API_URL+'mod', { headers: authHeader() })
    }

    getAdminBoard() {
        return axios.get(API_URL+'admin', { headers: authHeader() })
    }
}

export default new UserService();