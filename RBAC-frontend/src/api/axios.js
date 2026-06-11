
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://rbac-jraj.onrender.com/api',
});

// token in every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;