import { DEMO_EMPLOYEE } from "@/lib/dashboard-demo";
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
      email: email || DEMO_EMPLOYEE.email,
      first_name: DEMO_EMPLOYEE.firstName,
      last_name: DEMO_EMPLOYEE.lastName,
      employee_id: DEMO_EMPLOYEE.employeeId,
    },
  };
}
