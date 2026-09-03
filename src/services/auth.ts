import type {
  LoginRequest,
  PasswordResetCodeRequest,
  PasswordResetConfirmRequest,
  RegisterRequest,
} from "@/types/app/request";
import { useAuthStore } from "@/store/useAuthStore";
import { apiService } from "./base";

export const login = (data: LoginRequest) => {
  return apiService.post("base", "/api/auth/login/", data);
};

export const registerEmployer = (data: RegisterRequest) => {
  return apiService.post("base", "/api/auth/register/", data);
};

export const requestPasswordReset = (data: PasswordResetCodeRequest) => {
  return apiService.post("base", "/api/auth/password/reset/", data);
};

export const confirmPasswordReset = (data: PasswordResetConfirmRequest) => {
  return apiService.post("base", "/api/auth/password/reset/confirm/", data);
};

export const handleLogout = () => {
  useAuthStore.getState().logout();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};
