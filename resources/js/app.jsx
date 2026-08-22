import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import axios from 'axios';

// ✅ CONFIGURACIÓN PARA HTTPS
axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// ✅ INTERCEPTOR PARA FORZAR HTTPS
axios.interceptors.request.use(config => {
    if (config.url && typeof config.url === 'string' && config.url.startsWith('http://')) {
        config.url = config.url.replace('http://', 'https://');
    }
    return config;
});

// Configurar CSRF automáticamente para todas las peticiones
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
}

const appName = import.meta.env.VITE_APP_NAME || 'Antillas Premier League';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(
        `./pages/${name}.jsx`,
        import.meta.glob('./pages/**/*.jsx')
    ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#F5C518',
    },
});