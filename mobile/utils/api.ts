import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For physical device testing (Expo Go), use the host machine's actual local network IP.
// For Android emulator only, use '10.0.2.2' instead.
const HOST = '10.157.28.46'; 

export const api = axios.create({
  baseURL: `http://${HOST}:5000/api`,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('patientToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
