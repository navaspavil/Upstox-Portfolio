import axios from 'axios';
import {apiBaseUrl} from '../utils/constants';

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false,
});

export default api;
