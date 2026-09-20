import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "./apiClient";

/** GET /api/ideas */
export function fetchIdeas(token?: string | null): Promise<any> {
  return apiGet<any>("/api/ideas", token);
}

/** GET /api/ideas/slug/:slug */
export function fetchIdeaBySlug(
  slug: string,
  token?: string | null
): Promise<any> {
  return apiGet<any>(`/api/ideas/slug/${slug}`, token);
}

/** POST /api/ideas (JSON body) */
export function createIdea(data: unknown, token?: string | null): Promise<any> {
  return apiPost<any>("/api/ideas", data, token);
}

/** PUT /api/ideas/:id (JSON body, passed through as-is) */
export function updateIdea(
  id: string,
  data: unknown,
  token?: string | null
): Promise<any> {
  return apiPut<any>(`/api/ideas/${id}`, data, token);
}

/** DELETE /api/ideas/:id */
export function deleteIdea(id: string, token?: string | null): Promise<any> {
  return apiDelete<any>(`/api/ideas/${id}`, token);
}

/** PATCH /api/ideas/:id/like (no body) */
export function likeIdea(id: string, token?: string | null): Promise<any> {
  return apiPatch<any>(`/api/ideas/${id}/like`, undefined, token);
}
