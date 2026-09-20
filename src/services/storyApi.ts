import { apiDelete, apiGet, apiPost, apiPut } from "./apiClient";

/** GET /api/story */
export function fetchStories(token?: string | null): Promise<any> {
  return apiGet<any>("/api/story", token);
}

/** GET /api/story?category=:category */
export function fetchStoriesByCategory(
  category: string,
  token?: string | null
): Promise<any> {
  return apiGet<any>(`/api/story?category=${category}`, token);
}

/** GET /api/story/categories */
export function fetchStoryCategories(token?: string | null): Promise<any> {
  return apiGet<any>("/api/story/categories", token);
}

/** GET /api/story/:id */
export function fetchStoryById(
  id: string,
  token?: string | null
): Promise<any> {
  return apiGet<any>(`/api/story/${id}`, token);
}

/** POST /api/story (FormData body) */
export function createStory(
  data: unknown,
  token?: string | null
): Promise<any> {
  return apiPost<any>("/api/story", data, token);
}

/** PUT /api/story/:id (FormData body) */
export function updateStory(
  id: string,
  data: unknown,
  token?: string | null
): Promise<any> {
  return apiPut<any>(`/api/story/${id}`, data, token);
}

/** DELETE /api/story/:id */
export function deleteStory(id: string, token?: string | null): Promise<any> {
  return apiDelete<any>(`/api/story/${id}`, token);
}
