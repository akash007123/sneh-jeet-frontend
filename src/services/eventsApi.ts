import { apiDelete, apiGet, apiPost, apiPut } from "./apiClient";

/** GET /api/event */
export function fetchEvents(token?: string | null): Promise<any> {
  return apiGet<any>("/api/event", token);
}

/** GET /api/event/slug/:slug */
export function fetchEventBySlug(
  slug: string,
  token?: string | null
): Promise<any> {
  return apiGet<any>(`/api/event/slug/${slug}`, token);
}

/** POST /api/event (JSON body) */
export function createEvent(data: unknown, token?: string | null): Promise<any> {
  return apiPost<any>("/api/event", data, token);
}

/** PUT /api/event/:id (JSON body) */
export function updateEvent(
  id: string,
  data: unknown,
  token?: string | null
): Promise<any> {
  return apiPut<any>(`/api/event/${id}`, data, token);
}

/** DELETE /api/event/:id */
export function deleteEvent(
  id: string,
  token?: string | null
): Promise<any> {
  return apiDelete<any>(`/api/event/${id}`, token);
}
