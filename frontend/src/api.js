import axios from "axios";

const API = axios.create({
  baseURL: '', // Use empty string so Vite proxy works and avoids double /api
  withCredentials: true,
});

// attach firebase token function will be called where needed
export async function attachTokenToHeaders(token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return API;
}

export default API;
