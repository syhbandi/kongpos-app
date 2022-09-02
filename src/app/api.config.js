import axios from "axios";

const api = axios.create({
  baseURL: "https://misterkong.com/kong_api/pos/api",
});

export default api;
