import axios from "axios";

const DEV_URL = "http://localhost:8080";
const PROD_URL = "https://nce-backend-production.up.railway.app/";

const api = axios.create({
  baseURL: DEV_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const handledError = handleError(error);
    return Promise.reject(handledError);
  },
);

const handleError = (error) => {
  if (error.response) {
    const { statusCode, message, timestamp } = error.response?.data ?? {};

    const resolvedStatusCode = statusCode ?? 500;
    const resolvedMessage = message ?? "An unexpected error occurred.";
    const resolvedTimestamp = timestamp ?? new Date().toISOString();

    return {
      errorMessage: `Error ${resolvedStatusCode}: ${resolvedMessage}\nOccurred at: ${resolvedTimestamp}`,
    };
  } else if (error.request) {
    return {
      errorMessage: "The server is not responding. Please try again later.",
    };
  } else {
    return {
      errorMessage: "An unexpected error occurred.",
    };
  }
};

export default api;
