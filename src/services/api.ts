import axios from 'axios';

// экземпляр Axios с общими настройками
export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000, // Тайм-аут в миллисекундах
    headers: {
        'Content-Type': 'application/json',
    },
});