import axios from "axios";
import { useRouter } from "vue-router";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      const router = useRouter();
      await router.push({ path: "login" });
      return;
    }

    return Promise.reject(error.response);
  }
);

export default http;
