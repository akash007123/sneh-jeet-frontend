import { apiDelete, apiGet, apiPost, apiPut } from "./apiClient";

/** GET /api/comments/blog/:blogId */
export function fetchCommentsByBlog(
  blogId: string,
  token?: string | null
): Promise<any> {
  return apiGet<any>(`/api/comments/blog/${blogId}`, token);
}

/** GET /api/comments/blog/:blogId/count */
export function fetchCommentCountByBlog(
  blogId: string,
  token?: string | null
): Promise<any> {
  return apiGet<any>(`/api/comments/blog/${blogId}/count`, token);
}

/** POST /api/comments (FormData body) */
export function createComment(
  data: unknown,
  token?: string | null
): Promise<any> {
  return apiPost<any>("/api/comments", data, token);
}

/** PUT /api/comments/:id (FormData body) */
export function updateComment(
  id: string,
  data: unknown,
  token?: string | null
): Promise<any> {
  return apiPut<any>(`/api/comments/${id}`, data, token);
}

/** DELETE /api/comments/:id */
export function deleteComment(
  id: string,
  token?: string | null
): Promise<any> {
  return apiDelete<any>(`/api/comments/${id}`, token);
}
