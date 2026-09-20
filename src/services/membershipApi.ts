import { apiDelete, apiFetch, apiGet, apiPost, apiPut } from "./apiClient";

/**
 * POST /api/membership (public application form, multipart FormData).
 * Returns the raw Response so callers keep their `response.ok` handling.
 */
export function submitMembership(data: FormData): Promise<Response> {
  return apiFetch("/api/membership", { method: "POST", body: data });
}

/** GET /api/membership (or /api/membership?status=...) */
export function fetchMemberships(
  statusFilter = "All",
  token?: string | null
): Promise<any> {
  const path =
    statusFilter === "All"
      ? "/api/membership"
      : `/api/membership?status=${statusFilter}`;
  return apiGet<any>(path, token);
}

/** POST /api/membership/admin (admin-created member, multipart FormData) */
export function createMemberAdmin(
  data: FormData,
  token?: string | null
): Promise<any> {
  return apiPost<any>("/api/membership/admin", data, token);
}

/** PUT /api/membership/:id */
export function updateMembership(
  id: string,
  data: unknown,
  token?: string | null
): Promise<any> {
  return apiPut<any>(`/api/membership/${id}`, data, token);
}

/** DELETE /api/membership/:id */
export function deleteMembership(
  id: string,
  token?: string | null
): Promise<any> {
  return apiDelete<any>(`/api/membership/${id}`, token);
}
