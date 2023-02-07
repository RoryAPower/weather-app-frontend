import axios from "axios";
import { useUserStore } from "@/stores/useUserStore";
import router from "@/router";

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
      const store = useUserStore();
      store.isUserLoggedIn = false;
      store.user = null;

      if (router.currentRoute.value.name !== "Login")
        await router.push({ path: "login" });
      return;
    }

    return Promise.reject(error.response);
  }
);

export default http;
