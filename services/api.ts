import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: 'https://api.seuevento.com',
    timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    const session = await SecureStore.getItemAsync('user_session');
    if (session) {
        const { token } = JSON.parse(session);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;