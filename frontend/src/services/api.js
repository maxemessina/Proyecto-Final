import axios from 'axios';

const API_BASE = (process.env.REACT_APP_API_URL || '/api').replace(/\/$/, '');

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url || '';
    const isAuthRequest = url.endsWith('/login') || url.endsWith('/register');

    if (status === 401 && !isAuthRequest && typeof window !== 'undefined' && window.location.pathname !== '/login') {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (e) {}
        window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
