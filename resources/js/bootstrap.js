import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// ✅ FORZAR HTTPS EN TODAS LAS PETICIONES
window.axios.defaults.baseURL = window.location.origin;

// ✅ INTERCEPTOR PARA FORZAR HTTPS
window.axios.interceptors.request.use(config => {
    if (config.url && typeof config.url === 'string' && config.url.startsWith('http://')) {
        config.url = config.url.replace('http://', 'https://');
    }
    return config;
});