import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cec6-193-54-192-76.ngrok-free.app/backend/api/',
});

export default api;
