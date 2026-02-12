import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-v2.immoplus.ci',
  headers: {
    'accept': 'application/json',
  },
});

export default api;

export const getImageUrl = (id: string) => `https://api-v2.immoplus.ci/files/raw/public/${id}`;
export const getVideoUrl = (id: string) => `https://api-v2.immoplus.ci/files/videos/raw/public/${id}`;
