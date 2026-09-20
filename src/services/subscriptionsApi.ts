import { apiDelete, apiFetch, apiGet, apiPut } from "./apiClient";

/**
 * POST /api/subscriptions (public newsletter form).
 * Returns the raw Response so callers keep their `response.ok` handling.
 */
export function subscribe(email: string): Promise<Response> {
  return apiFetch("/api/subscriptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

/** GET /api/subscriptions (or /api/subscriptions?status=...) */
export function fetchSubscriptions(
  statusFilter: string,
  token?: string | null
): Promise<any> {
  const path =
    statusFilter === "All"
      ? "/api/subscriptions"
      : `/api/subscriptions?status=${statusFilter}`;
  return apiGet<any>(path, token);
}

/** PUT /api/subscriptions/:id — update status */
export function updateSubscriptionStatus(
  id: string,
  status: string,
  token?: string | null
): Promise<any> {
  return apiPut<any>(`/api/subscriptions/${id}`, { status }, token);
}

/** DELETE /api/subscriptions/:id */
export function deleteSubscription(
  id: string,
  token?: string | null
): Promise<any> {
  return apiDelete<any>(`/api/subscriptions/${id}`, token);
}
