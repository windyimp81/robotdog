import axios from "axios";

const BASE_URL = "http://43.201.154.68:8100/";

export const apiRequest = axios.create({
  baseURL: BASE_URL,
});
