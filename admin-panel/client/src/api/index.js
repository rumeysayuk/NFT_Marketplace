import axios from "axios"
import {toast} from "react-toastify"

const apiAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URI,
    headers: {
        "Content-Type": "application/json",
    },
})

apiAxios.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

apiAxios.interceptors.response.use((response) => response, (error) => {
    if (error?.response?.data?.message) {
        toast.error(error.response.data.message)
    } else {
        toast.error("Please try again later!")
    }
    const unauthorized = error.response && error.response.status && (error.response.status === 401 || error.response.status === 403)
    if (unauthorized && !window.location.pathname.includes("/auth")) {
        localStorage.removeItem("token")
        setTimeout(() => {
            window.location.replace(`${window.location.origin}/auth`)
        }, 1000)
    }
    return Promise.reject(error)
})

export default apiAxios
