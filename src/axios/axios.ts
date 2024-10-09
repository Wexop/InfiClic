import axios, {AxiosInstance} from 'axios';
import {store} from '../store/store';

export const API_URL = 'https://inficlic-1.onrender.com/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Délai d'expiration de 10 secondes
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(request => {
  const state = store.getState();
  const token = state.auth.token;

  request.headers.Authorization = `Bearer ${token}`;

  return request;
});

export default apiClient;
