import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DEV_URL = "http://localhost:8080";
const PROD_URL = "https://nce-backend-production.up.railway.app/";

const api = axios.create({
  baseURL: PROD_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const handledError = handleError(error);
    throw handledError.errorMessage;
  },
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

function handleError(error) {
  if (error.response) {
    const { statusCode, message, timestamp } = error.response?.data ?? {};
    console.log(error);

    const resolvedStatusCode = statusCode ?? 500;
    const resolvedMessage = message ?? "An unexpected error occurred.";
    const resolvedTimestamp = timestamp ?? new Date().toISOString();
    return {
      errorMessage: {
        statusCode: resolvedStatusCode,
        message: resolvedMessage,
        timestamp: resolvedTimestamp,
      },
    };
  } else if (error.request) {
    return {
      errorMessage: {
        statusCode: 500,
        message: "The server is not responding. Please try again later.",
        timestamp: new Date().toISOString(),
      },
    };
  } else {
    return {
      errorMessage: {
        statusCode: 500,
        message: "An unexpected error occurred.",
        timestamp: new Date().toISOString(),
      },
    };
  }
}

export default api;
