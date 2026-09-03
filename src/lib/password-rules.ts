export type PasswordRule = {
  id: string;
  label: string;
  test: (value: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "length",
    label: "Minimum of 8 characters",
    test: (value) => value.length >= 8,
  },
  {
    id: "upper",
    label: "At least 1 uppercase character",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    id: "lower",
    label: "At least 1 lowercase character",
    test: (value) => /[a-z]/.test(value),
  },
  {
    id: "number",
    label: "At least 1 number character",
    test: (value) => /\d/.test(value),
  },
  {
    id: "special",
    label: "At least 1 special character, e.g., ! @ # ?",
    test: (value) => /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;'`~]/.test(value),
  },
];

export function isPasswordStrong(value: string) {
  return PASSWORD_RULES.every((rule) => rule.test(value));
}
