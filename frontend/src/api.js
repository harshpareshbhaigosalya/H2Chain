import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
});

// attach firebase token function will be called where needed
export async function attachTokenToHeaders(token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return API;
}

export default API;
