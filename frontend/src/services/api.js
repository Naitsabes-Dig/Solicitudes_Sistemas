import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // 👈 Backend corriendo en Node
});

export default api;
