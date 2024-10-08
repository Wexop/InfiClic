import axios, {AxiosInstance} from 'axios';
import {useAppSelector} from '../store/redux_hook.ts';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://inficlic.onrender.com/',
  timeout: 10000, // Délai d'expiration de 10 secondes
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(request => {
  const token = useAppSelector(state => state.auth.token);

  request.headers.Authorization = token;

  return request;
});

export default apiClient;
