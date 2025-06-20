import axios from "axios"
import { refreshToken } from "./auth/refreshToken"
import { logout } from "./auth/logout"


//base de la ruta donde se realizan las peticiones
const api = axios.create({
    baseURL: "http://localhost:8000/control/",
    headers: {
        "Content-Type": "application/json",
    },
})

// ➤ Interceptor para agregar el token en cada request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token")
        if (token && config.headers) {
            config.headers.Authorization = `Bearer   ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// ➤ Interceptor para manejar errores 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // Si fue un 401 y no estamos intentando refrescar
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            localStorage.getItem("refresh_token")
        ) {
            originalRequest._retry = true
            const newToken = await refreshToken()

            if (newToken) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`
                originalRequest.headers.Authorization = `Bearer ${newToken}`
                return api(originalRequest) // reintenta
            } else {
                logout()
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)

export default api