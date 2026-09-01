import Axios from "@/config/axios";
import { dedupeAxiosGet, getDedupeCacheKey } from "@/lib/api-get-dedupe";

class BaseService {
  private makeRequest(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    service: string,
    endpoint: string,
    data?: unknown,
    params?: Record<string, unknown>,
    config?: Record<string, unknown>,
  ) {
    const queryParams = new URLSearchParams({
      service,
      endpoint,
      ...params,
    }).toString();

    return Axios({
      method,
      url: `/api/proxy?${queryParams}`,
      data,
      ...config,
    });
  }

  get(
    service: string,
    endpoint: string,
    params?: Record<string, unknown>,
    config?: Record<string, unknown>,
  ) {
    const key = getDedupeCacheKey(service, endpoint, params);
    return dedupeAxiosGet(key, () =>
      this.makeRequest("GET", service, endpoint, undefined, params, config),
    );
  }

  post(
    service: string,
    endpoint: string,
    data?: unknown,
    params?: Record<string, unknown>,
    config?: Record<string, unknown>,
  ) {
    return this.makeRequest("POST", service, endpoint, data, params, config);
  }

  put(
    service: string,
    endpoint: string,
    data?: unknown,
    params?: Record<string, unknown>,
    config?: Record<string, unknown>,
  ) {
    return this.makeRequest("PUT", service, endpoint, data, params, config);
  }

  patch(
    service: string,
    endpoint: string,
    data?: unknown,
    params?: Record<string, unknown>,
    config?: Record<string, unknown>,
  ) {
    return this.makeRequest("PATCH", service, endpoint, data, params, config);
  }

  delete(
    service: string,
    endpoint: string,
    params?: Record<string, unknown>,
    config?: Record<string, unknown>,
  ) {
    return this.makeRequest(
      "DELETE",
      service,
      endpoint,
      undefined,
      params,
      config,
    );
  }
}

export const apiService = new BaseService();
