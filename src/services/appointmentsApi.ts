import { apiDelete, apiFetch, apiGet, apiPut } from "./apiClient";

/**
 * POST /api/appointments (public booking form).
 * Returns the raw Response so callers keep their `response.ok` handling.
 */
export function submitAppointment(data: unknown): Promise<Response> {
  return apiFetch("/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

/** GET /api/appointments (or /api/appointments?status=...) */
export function fetchAppointments(
  statusFilter: string,
  token?: string | null
): Promise<any> {
  const path =
    statusFilter === "All"
      ? "/api/appointments"
      : `/api/appointments?status=${statusFilter}`;
  return apiGet<any>(path, token);
}

/** PUT /api/appointments/:id */
export function updateAppointment(
  id: string,
  data: unknown,
  token?: string | null
): Promise<any> {
  return apiPut<any>(`/api/appointments/${id}`, data, token);
}

/** DELETE /api/appointments/:id */
export function deleteAppointment(
  id: string,
  token?: string | null
): Promise<any> {
  return apiDelete<any>(`/api/appointments/${id}`, token);
}
