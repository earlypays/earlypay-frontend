import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "@/lib/token-storage";
import { useAuthStore } from "@/store/useAuthStore";

function isPublicAuthRequestUrl(url: string): boolean {
  return (
    url.includes("api/auth/login") ||
    url.includes("api%2Fauth%2Flogin") ||
    url.includes("api/auth/register") ||
    url.includes("password/reset") ||
    url.includes("password%2Freset")
  );
}

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

axios.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: unknown) => {
    const originalRequest = (error as { config?: InternalAxiosRequestConfig })
      ?.config;
    const status = (error as { response?: { status?: number } })?.response
      ?.status;
    const reqUrl = originalRequest?.url ?? "";

    if (status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    if (isPublicAuthRequestUrl(reqUrl)) {
      return Promise.reject(error);
    }

    useAuthStore.getState().logout();

    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (
        !path.startsWith("/login") &&
        !path.startsWith("/forgot-password") &&
        !path.startsWith("/signup")
      ) {
        sessionStorage.setItem("redirectPath", path + window.location.search);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default axios;
