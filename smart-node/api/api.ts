import axios, { AxiosHeaders } from "axios";

// let token = "";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

api.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Edit places where this is used when you add renew token functionality
export const getToken = () => {
  const token = sessionStorage.getItem("token");
  // console.log("HEYYY 444", token);
  if (token) {
    // const token_payload = JSON.parse(window.atob(token));
    // console.log(token_payload);
  }

  return token;
}

api.interceptors.request.use((config) => {
  (config.headers as AxiosHeaders).set("Authorization", `Bearer ${getToken()}`);
  
  return config;
}, (error) => {
  return Promise.reject(error);
})

api.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
})

export default api;
