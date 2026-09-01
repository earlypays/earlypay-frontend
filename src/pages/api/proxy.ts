import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { API_BASE_URL } from "@/config/api";

export const config = {
  api: {
    bodyParser: false,
  },
};

const SERVICE_URLS = {
  base: API_BASE_URL,
} as const;

function extractErrorMessage(err: unknown): string {
  const error = err as AxiosError<unknown>;
  if (error.response?.data) {
    const data = error.response.data;

    if (typeof data === "string") {
      return data;
    }

    if (typeof data === "object" && data !== null) {
      const parts: string[] = [];
      const record = data as Record<string, unknown>;

      const pushStrings = (v: unknown): void => {
        if (typeof v === "string" && v.trim()) {
          parts.push(v.trim());
        } else if (Array.isArray(v)) {
          for (const item of v) {
            if (typeof item === "string" && item.trim()) {
              parts.push(item.trim());
            }
          }
        }
      };

      pushStrings(record.non_field_errors);
      pushStrings(record.detail);
      pushStrings(record.message);
      pushStrings(record.errorMessage);
      pushStrings(record.error);

      if (parts.length > 0) {
        return [...new Set(parts)].join(" ");
      }

      try {
        const stringified = JSON.stringify(data);
        return stringified.length > 500
          ? "Oops! An Error Occurred, Kindly try again."
          : stringified;
      } catch {
        return "Oops! An Error Occurred, Kindly try again.";
      }
    }
  }

  if (error.message) {
    return error.message;
  }

  return "An unknown error occurred";
}

function isFormDataRequest(req: NextApiRequest): boolean {
  const contentType = req.headers["content-type"] || "";
  return (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private",
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");

  const { service, endpoint, responseType, _t, ...params } = req.query;
  const { method, headers } = req;

  const isBlobRequest = responseType === "blob";
  const isFormData = isFormDataRequest(req);

  const serviceKey = typeof service === "string" ? service : String(service);
  if (!serviceKey || !(serviceKey in SERVICE_URLS)) {
    return res.status(400).json({
      error: "Invalid service",
      message: `Service '${service}' not found. Available services: ${Object.keys(
        SERVICE_URLS,
      ).join(", ")}`,
    });
  }

  const baseURL = SERVICE_URLS[serviceKey as keyof typeof SERVICE_URLS];
  if (!baseURL) {
    return res.status(503).json({
      error: "API not configured",
      message:
        "Set NEXT_PUBLIC_API_BASE_URL in your environment (see .env.example).",
    });
  }

  const endpointPath =
    typeof endpoint === "string"
      ? endpoint
      : Array.isArray(endpoint)
        ? (endpoint[0] ?? "")
        : String(endpoint ?? "");
  if (!endpointPath.trim()) {
    return res.status(400).json({
      error: "Missing endpoint",
      message: "Provide an endpoint query parameter (e.g. /api/v1/...).",
    });
  }
  const normalizedPath = endpointPath.startsWith("/")
    ? endpointPath
    : `/${endpointPath}`;
  const targetURL = `${baseURL}${normalizedPath}`;

  const cacheBustingParams = {
    ...params,
    _t: _t || Date.now().toString(),
  };

  const queryString =
    Object.keys(cacheBustingParams).length > 0
      ? `?${new URLSearchParams(
          cacheBustingParams as Record<string, string>,
        ).toString()}`
      : "";

  const finalURL = targetURL + queryString;

  try {
    const allowedHeaders = [
      "authorization",
      "content-type",
      "content-length",
      "accept",
      "user-agent",
      "accept-encoding",
      "accept-language",
    ];

    const filteredHeaders = Object.keys(headers)
      .filter((key) => allowedHeaders.includes(key.toLowerCase()))
      .reduce((obj, key) => {
        return { ...obj, [key]: headers[key] };
      }, {});

    let requestData;

    if (isFormData) {
      requestData = req;
    } else {
      requestData = await new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          try {
            resolve(body ? JSON.parse(body) : undefined);
          } catch {
            resolve(body);
          }
        });
        req.on("error", reject);
      });
    }

    const response = await axios({
      method: method,
      url: finalURL,
      data: requestData,
      headers: {
        ...filteredHeaders,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "X-Request-ID": `${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      },
      responseType: isBlobRequest ? "arraybuffer" : "json",
      timeout: isFormData ? 120_000 : 30_000,
      maxContentLength: 50 * 1024 * 1024,
    });

    if (isBlobRequest) {
      const contentType = String(
        response.headers["content-type"] ?? "application/octet-stream",
      );
      const contentDisposition = response.headers["content-disposition"];
      const contentLength = response.headers["content-length"];

      res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, private",
      );
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("Content-Type", contentType);

      if (contentDisposition) {
        res.setHeader("Content-Disposition", String(contentDisposition));
      }
      if (contentLength) {
        res.setHeader("Content-Length", String(contentLength));
      }

      res.status(response.status).send(Buffer.from(response.data));
    } else {
      const data = response.data;
      const emptyBody =
        data === undefined ||
        data === null ||
        (typeof data === "string" && data.trim() === "");
      if (emptyBody) {
        res.status(response.status).json({});
      } else {
        res.status(response.status).json(data);
      }
    }
  } catch (err) {
    const error = err as AxiosError;
    const errorMessage = extractErrorMessage(error);
    const statusCode = error.response?.status || 500;

    const errorResponse = {
      error: errorMessage,
      status: statusCode,
      statusText: error.response?.statusText || "Unknown Error",
      timestamp: new Date().toISOString(),
      ...(error.response?.data && typeof error.response.data === "object"
        ? { originalError: error.response.data }
        : {}),
    };

    res.status(statusCode).json(errorResponse);
  }
}
