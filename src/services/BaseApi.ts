import axios from 'axios';

export const baseApi = (() => {
  return axios.create({
    baseURL: process.env.REACT_APP_HOST_URL,
    headers: { 'Content-Type': 'application/json' },
  });
})();
