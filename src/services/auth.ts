import type { LoginRequest } from "@/types/app/request";
import { useAuthStore } from "@/store/useAuthStore";
import { apiService } from "./base";

export const login = (data: LoginRequest) => {
  return apiService.post("base", "/api/auth/login/", data);
};

export const handleLogout = () => {
  useAuthStore.getState().logout();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};
