import type { AxiosResponse } from "axios";

const INFLIGHT = new Map<string, Promise<AxiosResponse<unknown>>>();
const RECENT = new Map<
  string,
  { at: number; snapshot: AxiosResponse<unknown> }
>();

const TTL_MS = 2500;

function stableParamsKey(params?: Record<string, unknown>): string {
  if (!params || Object.keys(params).length === 0) return "";
  const sortedKeys = Object.keys(params).sort();
  const sorted: Record<string, unknown> = {};
  for (const k of sortedKeys) {
    sorted[k] = params[k];
  }
  return JSON.stringify(sorted);
}

export function getDedupeCacheKey(
  service: string,
  endpoint: string,
  params?: Record<string, unknown>,
): string {
  return `${service}::${endpoint}::${stableParamsKey(params)}`;
}

function shallowCloneResponse<T>(res: AxiosResponse<T>): AxiosResponse<T> {
  return {
    ...res,
    data: res.data,
  };
}

export function dedupeAxiosGet<T>(
  key: string,
  executor: () => Promise<AxiosResponse<T>>,
): Promise<AxiosResponse<T>> {
  const now = Date.now();
  const hit = RECENT.get(key);
  if (hit && now - hit.at < TTL_MS) {
    return Promise.resolve(
      shallowCloneResponse(hit.snapshot as AxiosResponse<T>),
    );
  }

  const pending = INFLIGHT.get(key);
  if (pending) {
    return pending as Promise<AxiosResponse<T>>;
  }

  const promise = executor()
    .then((res) => {
      RECENT.set(key, { at: Date.now(), snapshot: shallowCloneResponse(res) });
      return res;
    })
    .finally(() => {
      INFLIGHT.delete(key);
    });

  INFLIGHT.set(key, promise as Promise<AxiosResponse<unknown>>);
  return promise;
}
