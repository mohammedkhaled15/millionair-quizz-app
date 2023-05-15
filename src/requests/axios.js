import axios from "axios";

// const BASE_URL = "http://localhost:3000/api";
const BASE_URL = "https://millionaire-back.onrender.com/api";

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
