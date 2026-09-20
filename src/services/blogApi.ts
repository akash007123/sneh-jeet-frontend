import { apiDelete, apiGet, apiPost, apiPut } from "./apiClient";

/** GET /api/blog */
export function fetchBlogs(token?: string | null): Promise<any> {
  return apiGet<any>("/api/blog", token);
}

/** GET /api/blog/categories */
export function fetchBlogCategories(token?: string | null): Promise<any> {
  return apiGet<any>("/api/blog/categories", token);
}

/** GET /api/blog/slug/:slug */
export function fetchBlogBySlug(
  slug: string,
  token?: string | null
): Promise<any> {
  return apiGet<any>(`/api/blog/slug/${slug}`, token);
}

/** POST /api/blog (FormData body) */
export function createBlog(data: unknown, token?: string | null): Promise<any> {
  return apiPost<any>("/api/blog", data, token);
}

/** PUT /api/blog/:id (FormData body) */
export function updateBlog(
  id: string,
  data: unknown,
  token?: string | null
): Promise<any> {
  return apiPut<any>(`/api/blog/${id}`, data, token);
}

/** DELETE /api/blog/:id */
export function deleteBlog(id: string, token?: string | null): Promise<any> {
  return apiDelete<any>(`/api/blog/${id}`, token);
}
