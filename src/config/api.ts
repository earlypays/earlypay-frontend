const raw = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_BASE_URL = (raw ?? "").replace(/\/+$/, "");

export function isApiBaseConfigured(): boolean {
  return API_BASE_URL.length > 0;
}
