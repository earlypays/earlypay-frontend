import type { LoginResponse } from "@/types/app/response";

export function simulateDelay(ms = 700) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function mockLoginResponse(email: string): LoginResponse {
  return {
    access: "demo-access-token",
    refresh: "demo-refresh-token",
    user: {
      id: "demo-user",
      email,
      first_name: "Demo",
      last_name: "Employer",
    },
  };
}
