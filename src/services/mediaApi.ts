import { apiDelete, apiGet, apiPost, apiPut } from "./apiClient";

/** GET /api/media */
export function fetchMedia(token?: string | null): Promise<any> {
  return apiGet<any>("/api/media", token);
}

/** GET /api/media?published=true */
export function fetchPublishedMedia(token?: string | null): Promise<any> {
  return apiGet<any>("/api/media?published=true", token);
}

/** GET /api/media/slug/:slug */
export function fetchMediaBySlug(
  slug: string,
  token?: string | null
): Promise<any> {
  return apiGet<any>(`/api/media/slug/${slug}`, token);
}

/** POST /api/media (FormData body) */
export function createMedia(
  data: unknown,
  token?: string | null
): Promise<any> {
  return apiPost<any>("/api/media", data, token);
}

/** PUT /api/media/:id (FormData body) */
export function updateMedia(
  id: string,
  data: unknown,
  token?: string | null
): Promise<any> {
  return apiPut<any>(`/api/media/${id}`, data, token);
}

/** DELETE /api/media/:id */
export function deleteMedia(id: string, token?: string | null): Promise<any> {
  return apiDelete<any>(`/api/media/${id}`, token);
}
