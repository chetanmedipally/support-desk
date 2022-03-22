import axios from "axios";

const PROXY="http://localhost:5000/"

//Register user
const register = async (userData) => {
    const response = await axios.post(PROXY+'api/users', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(PROXY+'api/users/login', userData)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => localStorage.removeItem('user')

const authService = {
    register,
    login,
    logout
} 

export default authService