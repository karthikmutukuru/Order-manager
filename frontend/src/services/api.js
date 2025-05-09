import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
});

// Add CSRF protection for POST requests
API.interceptors.request.use(async (config) => {
  if (['post', 'put', 'delete'].includes(config.method.toLowerCase())) {
    await API.get('/sanctum/csrf-cookie');
  }
  return config;
});

export default API;