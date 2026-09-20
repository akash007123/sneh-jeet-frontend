/**
 * Central API client for the frontend.
 *
 * ALL backend communication must go through this module (or the per-domain
 * modules in `src/services/` that wrap it). No other frontend file may read
 * `import.meta.env.VITE_API_BASE_URL` directly or hard-code a backend origin.
 *
 * Design notes (behavior-preserving):
 * - `apiFetch` is a drop-in replacement for `fetch`: same options, same
 *   `Response` semantics. It only resolves the base URL and injects the
 *   stored JWT when the caller did not provide an explicit Authorization
 *   header — exactly what every call site does by hand today.
 * - `Content-Type` is never touched automatically, so `FormData` uploads
 *   keep working (the browser sets the multipart boundary itself).
 */
import axios, { AxiosHeaders } from "axios";

/** Backend origin, e.g. `http://localhost:5000`. No trailing slash. */
export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  "http://localhost:5000";

/** Read the persisted JWT (written by the auth flow on login/signup). */
export function getStoredToken(): string | null {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
}

export function setStoredToken(token: string): void {
  localStorage.setItem("token", token);
}

export function clearStoredToken(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

/**
 * Resolve a backend-served asset path (e.g. `/uploads/profile/abc.jpg`)
 * to an absolute URL for `<img src>`. Returns `undefined` for empty input
 * so call sites can keep their `?? placeholder` / conditional rendering.
 * Absolute URLs are returned unchanged.
 */
export function assetUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Error thrown by the `api*` JSON helpers on non-2xx responses. */
export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(status: number, message: string, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

export interface ApiFetchOptions extends RequestInit {
  /**
   * Explicit JWT. When omitted, the stored token (if any) is used.
   * Pass `null` to force an unauthenticated request.
   */
  token?: string | null;
}

/** Join a relative API path with the backend origin. */
export function apiUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function withAuthHeaders(
  headers: HeadersInit | undefined,
  token: string | null | undefined
): HeadersInit {
  const resolved = token === undefined ? getStoredToken() : token;
  if (!resolved) return headers ?? {};
  const h = new Headers(headers ?? {});
  if (!h.has("Authorization")) h.set("Authorization", `Bearer ${resolved}`);
  return h;
}

/**
 * `fetch` scoped to the backend API. Returns the raw `Response` so existing
 * `!response.ok` handling keeps working unchanged.
 */
export async function apiFetch(
  path: string,
  options: ApiFetchOptions = {}
): Promise<Response> {
  const { token, headers, ...rest } = options;
  return fetch(apiUrl(path), {
    ...rest,
    headers: withAuthHeaders(headers, token),
  });
}

/** `apiFetch` + non-2xx throws `ApiError` + parses JSON (tolerates empty bodies). */
export async function apiJson<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const response = await apiFetch(path, options);
  let payload: unknown = null;
  try {
    payload =
      response.status === 204 ? null : ((await response.json()) as unknown);
  } catch {
    payload = null;
  }
  if (!response.ok) {
    const message =
      (payload as { message?: unknown; error?: unknown } | null)?.message ??
      (payload as { error?: unknown } | null)?.error;
    throw new ApiError(
      response.status,
      typeof message === "string" && message
        ? message
        : `Request failed with status ${response.status}`,
      payload ?? undefined
    );
  }
  return payload as T;
}

function jsonBody(body: unknown): { body?: BodyInit; headers?: HeadersInit } {
  if (body === undefined) return {};
  if (body instanceof FormData || typeof body === "string") return { body };
  return {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };
}

/** GET + parse JSON. */
export function apiGet<T>(path: string, token?: string | null): Promise<T> {
  return apiJson<T>(path, { token });
}

/** POST a JSON object or FormData + parse JSON. */
export function apiPost<T>(
  path: string,
  body?: unknown,
  token?: string | null
): Promise<T> {
  const { body: b, headers } = jsonBody(body);
  return apiJson<T>(path, { method: "POST", body: b, headers, token });
}

/** PUT a JSON object or FormData + parse JSON. */
export function apiPut<T>(
  path: string,
  body?: unknown,
  token?: string | null
): Promise<T> {
  const { body: b, headers } = jsonBody(body);
  return apiJson<T>(path, { method: "PUT", body: b, headers, token });
}

/** PATCH a JSON object + parse JSON. */
export function apiPatch<T>(
  path: string,
  body?: unknown,
  token?: string | null
): Promise<T> {
  const { body: b, headers } = jsonBody(body);
  return apiJson<T>(path, { method: "PATCH", body: b, headers, token });
}

/** DELETE + parse JSON. */
export function apiDelete<T>(path: string, token?: string | null): Promise<T> {
  return apiJson<T>(path, { method: "DELETE", token });
}

/**
 * Shared axios instance for the few call sites that use axios
 * (auth flow). Pre-configured with the backend base URL and automatic
 * JWT injection. Callers keep their own response-interceptor logic
 * (e.g. 401 → logout) exactly as before.
 */
export const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const headers =
    config.headers instanceof AxiosHeaders
      ? config.headers
      : new AxiosHeaders(config.headers);
  if (!headers.get("Authorization")) {
    const token = getStoredToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }
  config.headers = headers;
  return config;
});

export function setApiAuthToken(token: string | null): void {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

/** Backend origin for socket.io connections. */
export function socketUrl(): string {
  return API_BASE_URL;
}
