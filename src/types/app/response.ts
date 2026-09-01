export type LoginResponse = {
  access: string;
  refresh: string;
  user?: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    [key: string]: unknown;
  };
};

export type AuthProfileResponse = Record<string, unknown>;
