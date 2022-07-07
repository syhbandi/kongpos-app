import axios from "axios";

const api = axios.create({
  baseURL: "http://misterkong.com/kong_api/pos/api",
});

export default api;
