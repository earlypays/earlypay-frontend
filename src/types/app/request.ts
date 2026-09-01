export type LoginRequest = {
  email: string;
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
