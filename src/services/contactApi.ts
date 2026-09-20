import { apiDelete, apiFetch, apiGet, apiPut } from "./apiClient";

/**
 * POST /api/contact (public contact form).
 * Returns the raw Response so callers keep their `response.ok` handling.
 */
export function submitContact(data: unknown): Promise<Response> {
  return apiFetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

/** GET /api/contact (or /api/contact?status=...) */
export function fetchContacts(
  statusFilter: string,
  token?: string | null
): Promise<any> {
  const path =
    statusFilter === "All"
      ? "/api/contact"
      : `/api/contact?status=${statusFilter}`;
  return apiGet<any>(path, token);
}

/** PUT /api/contact/:id — update status */
export function updateContactStatus(
  id: string,
  status: string,
  token?: string | null
): Promise<any> {
  return apiPut<any>(`/api/contact/${id}`, { status }, token);
}

/** DELETE /api/contact/:id */
export function deleteContact(id: string, token?: string | null): Promise<any> {
  return apiDelete<any>(`/api/contact/${id}`, token);
}
