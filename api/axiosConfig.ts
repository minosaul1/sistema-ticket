import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/control',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        config.headers = config.headers ?? {};
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
