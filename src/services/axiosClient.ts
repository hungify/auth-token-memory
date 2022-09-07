import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL_SERVER}/api`,
});

axiosClient.interceptors.request.use((config) => {
  return config;
});

axiosClient.interceptors.response.use((response) => {
  return response;
});
