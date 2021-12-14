import axios from 'axios'

const instance = axios.create({
    baseURL: "http://school-management-api.test/api",
    headers: {
        "Content-Type": "application/json"
    }
})

export default instance;