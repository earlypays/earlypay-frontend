import { isAxiosError, type AxiosError } from "axios";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function normalizeAxiosData(data: unknown): unknown {
  if (typeof data === "string") {
    const t = data.trim();
    if (t.startsWith("{") || t.startsWith("[")) {
      try {
        return JSON.parse(data) as unknown;
      } catch {
        return data;
      }
    }
    return data;
  }
  return data;
}

function isUnhelpfulTransportMessage(msg: string): boolean {
  const t = msg.trim();
  if (!t) return true;
  if (/^Request failed with status code \d+$/i.test(t)) return true;
  if (t === "Network Error") return true;
  if (t === "An unknown error occurred") return true;
  if (t.startsWith("Oops! An Error Occurred")) return true;
  return false;
}

export function messageForHttpStatus(
  status: number | undefined,
): string | null {
  if (status == null || !Number.isFinite(status)) return null;
  switch (status) {
    case 400:
      return "The request was invalid. Please check the information and try again.";
    case 401:
      return "Your session has expired. Please sign in again.";
    case 403:
      return "You don’t have permission to perform this action.";
    case 404:
      return "That resource was not found. It may have been removed or the link is outdated.";
    case 405:
      return "This action isn’t allowed for that resource.";
    case 408:
    case 504:
      return "The request timed out. Please try again.";
    case 409:
      return "This conflicts with the current data. Refresh the page and try again.";
    case 422:
      return "Some fields need correction. Check the form and try again.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    case 500:
      return "Something went wrong on the server. Please try again later.";
    case 502:
    case 503:
      return "The service is temporarily unavailable. Please try again later.";
    default:
      if (status >= 500) {
        return "Something went wrong on the server. Please try again later.";
      }
      if (status >= 400) {
        return "The request could not be completed. Please try again.";
      }
      return null;
  }
}

function messageForNetworkFailure(errorMessage: string): string | null {
  const m = errorMessage.toLowerCase();
  if (m.includes("network error") || m === "network error") {
    return "We couldn’t reach the server. Check your internet connection and try again.";
  }
  if (
    m.includes("timeout") ||
    m.includes("econnaborted") ||
    m.includes("etimedout")
  ) {
    return "The request timed out. Please try again.";
  }
  return null;
}

function resolveStatus(
  responseStatus: number | undefined,
  body: Record<string, unknown> | null,
): number | undefined {
  if (typeof responseStatus === "number" && Number.isFinite(responseStatus)) {
    return responseStatus;
  }
  if (body && typeof body.status === "number" && Number.isFinite(body.status)) {
    return body.status;
  }
  return undefined;
}

function messageFromValidationBody(
  data: Record<string, unknown>,
): string | null {
  const parts: string[] = [];

  const pushStrings = (v: unknown) => {
    if (typeof v === "string" && v.trim()) {
      parts.push(v.trim());
      return;
    }
    if (Array.isArray(v)) {
      for (const item of v) {
        if (typeof item === "string" && item.trim()) parts.push(item.trim());
        else if (isRecord(item)) {
          const nested = messageFromValidationBody(item);
          if (nested) parts.push(nested);
        }
      }
    }
  };

  if (typeof data.detail === "string" && data.detail.trim()) {
    return data.detail.trim();
  }
  pushStrings(data.detail);
  pushStrings(data.non_field_errors);

  for (const [key, value] of Object.entries(data)) {
    if (
      key === "detail" ||
      key === "non_field_errors" ||
      key === "error" ||
      key === "message"
    ) {
      continue;
    }
    if (Array.isArray(value) && value.every((x) => typeof x === "string")) {
      pushStrings(value);
    } else if (typeof value === "string" && value.trim()) {
      parts.push(value.trim());
    }
  }

  if (parts.length === 0) return null;
  return [...new Set(parts)].join(" ");
}

function parseAxiosErrorPayload(error: AxiosError): {
  candidate: string | null;
  status: number | undefined;
  hasResponse: boolean;
} {
  const hasResponse = error.response != null;
  const raw = error.response?.data;
  const data = normalizeAxiosData(raw);

  const status = resolveStatus(
    error.response?.status,
    isRecord(data) ? data : null,
  );

  if (typeof data === "string") {
    const trimmed = data.trim();
    if (
      trimmed.startsWith("<") ||
      trimmed.toLowerCase().startsWith("<!doctype")
    ) {
      return { candidate: null, status, hasResponse };
    }
    if (trimmed && !isUnhelpfulTransportMessage(trimmed)) {
      return { candidate: trimmed, status, hasResponse };
    }
    return { candidate: null, status, hasResponse };
  }

  if (!isRecord(data)) {
    return { candidate: null, status, hasResponse };
  }

  if (isRecord(data.originalError)) {
    const fromOrig = messageFromValidationBody(data.originalError);
    if (fromOrig && !isUnhelpfulTransportMessage(fromOrig)) {
      return { candidate: fromOrig, status, hasResponse };
    }
  }

  const errorField = data.error ?? data.message ?? data.detail;
  if (typeof errorField === "string" && errorField.trim()) {
    const trimmed = errorField.trim();
    if (
      trimmed.startsWith("<") ||
      trimmed.toLowerCase().startsWith("<!doctype")
    ) {
      return { candidate: null, status, hasResponse };
    }
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      const parsed = normalizeAxiosData(trimmed);
      if (isRecord(parsed)) {
        const fromValidation = messageFromValidationBody(parsed);
        if (fromValidation && !isUnhelpfulTransportMessage(fromValidation)) {
          return { candidate: fromValidation, status, hasResponse };
        }
      }
    }
    if (!isUnhelpfulTransportMessage(trimmed)) {
      return { candidate: trimmed, status, hasResponse };
    }
  }

  const fromValidation = messageFromValidationBody(data);
  if (fromValidation && !isUnhelpfulTransportMessage(fromValidation)) {
    return { candidate: fromValidation, status, hasResponse };
  }

  return { candidate: null, status, hasResponse };
}

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (isAxiosError(error)) {
    const { candidate, status, hasResponse } = parseAxiosErrorPayload(error);
    if (candidate) return candidate;

    if (!hasResponse) {
      const net = messageForNetworkFailure(error.message || "");
      if (net) return net;
    }

    const byStatus = messageForHttpStatus(status);
    if (byStatus) return byStatus;

    if (error.message && !isUnhelpfulTransportMessage(error.message)) {
      return error.message;
    }
    return fallback;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
