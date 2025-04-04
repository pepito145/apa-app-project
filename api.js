import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://cec6-193-54-192-76.ngrok-free.app/backend/api/',
});

let cachedToken = null;

export const setToken = (token) => {
  cachedToken = token;
};

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access_token');
  console.log('🔑 Token utilisé dans la requête:', token);
  // 这里统一打印请求的详细信息
  console.log('➡️ [API Request]');
  console.log('  ➤ URL:', config.baseURL + config.url);
  console.log('  ➤ Method:', config.method);
  console.log('  ➤ Params:', config.params);
  console.log('  ➤ Data:', config.data);
  console.log('  ➤ Headers:', config.headers);

  return config;
});

export default api;
