import axios from "axios";

const BASE_URL = window.location.origin.includes("localhost")
  ? "http://localhost:5001/api"
  : "/api";
const api = axios.create({ 
    baseURL : BASE_URL,
 });
console.log("BASE_URL:", BASE_URL);
export default api;