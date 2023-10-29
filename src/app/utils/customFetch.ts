import axios from 'axios';

const customFetch = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://app-jobly.vercel.app/api" : "http://localhost:3000/api",
});

export default customFetch;
