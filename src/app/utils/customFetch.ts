import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://https://app-jobly.vercel.app/api',
});

export default customFetch;
