/*this file need to be studied more as this connecting the frontedn to backend

http://localhost:8080
https://glittery-cheesecake-8fb866.netlify.app/
*/

import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:8080',


});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        // 👇 This new header tells ngrok to skip the browser warning
        config.headers['ngrok-skip-browser-warning'] = 'true';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
