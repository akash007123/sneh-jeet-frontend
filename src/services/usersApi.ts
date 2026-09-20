import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "./apiClient";

/** GET /api/users (or /api/users?status=...) — mirrors UsersPage filter logic. */
export function listUsers(
  statusFilter: string,
  token?: string | null
): Promise<any> {
  const path =
    statusFilter === "All" ? "/api/users" : `/api/users?status=${statusFilter}`;
  return apiGet<any>(path, token);
}

/** PATCH /api/users/:id/status */
export function updateUserStatus(
  id: string,
  isActive: boolean,
  token?: string | null
): Promise<any> {
  return apiPatch<any>(`/api/users/${id}/status`, { isActive }, token);
}

/** DELETE /api/users/:id */
export function deleteUser(id: string, token?: string | null): Promise<any> {
  return apiDelete<any>(`/api/users/${id}`, token);
}

/** POST /api/users (multipart FormData) */
export function createUser(data: FormData, token?: string | null): Promise<any> {
  return apiPost<any>("/api/users", data, token);
}

/** PUT /api/users/:id (multipart FormData) */
export function updateUser(
  id: string,
  data: FormData,
  token?: string | null
): Promise<any> {
  return apiPut<any>(`/api/users/${id}`, data, token);
}
