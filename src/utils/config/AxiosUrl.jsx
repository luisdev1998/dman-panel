import axios from "axios";

const clientAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    timeout: 8000
});

clientAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
}, error => {
    return Promise.reject(error);
});

clientAxios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.code === 'ECONNABORTED') {
        return Promise.reject(new Error('La petición ha superado el tiempo límite.'));
    } else if (error.response) {
        return Promise.reject(new Error(error.response.data.message || error.message));
    } else if (error.request) {
        return Promise.reject(new Error('El servidor no respondió a la petición.'));
    } else {
        return Promise.reject(new Error('Error al realizar la petición.'));
    }
});

export default clientAxios;
