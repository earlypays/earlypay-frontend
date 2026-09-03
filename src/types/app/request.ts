export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  organization_name: string;
  email: string;
  phone: string;
  password: string;
};

export type PasswordResetCodeRequest = {
  email: string;
};

export type PasswordResetConfirmRequest = {
  email: string;
  otp: string;
  new_password: string;
};
