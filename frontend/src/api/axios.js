import axios from 'axios';

const API = axios.create({
  baseURL: 'https://web-production-91cf9.up.railway.app/api/',
});

// Add token to every request if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;