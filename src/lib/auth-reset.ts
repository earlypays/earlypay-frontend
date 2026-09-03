const EMAIL_KEY = "earlypay.reset.email";
const OTP_KEY = "earlypay.reset.otp";

export function setResetEmail(email: string) {
  sessionStorage.setItem(EMAIL_KEY, email);
}

export function getResetEmail() {
  return sessionStorage.getItem(EMAIL_KEY) ?? "";
}

export function setResetOtp(otp: string) {
  sessionStorage.setItem(OTP_KEY, otp);
}

export function getResetOtp() {
  return sessionStorage.getItem(OTP_KEY) ?? "";
}

export function clearResetFlow() {
  sessionStorage.removeItem(EMAIL_KEY);
  sessionStorage.removeItem(OTP_KEY);
}
