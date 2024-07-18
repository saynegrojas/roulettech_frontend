// interceptor --> intercepts any request we are sending and automatically add headers to the request
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

// GET API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    // look in local storage and see if we have an access token
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
