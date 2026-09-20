import { apiDelete, apiGet, apiPost, apiPut } from "./apiClient";

/** GET /api/gallery */
export function fetchGalleryItems(token?: string | null): Promise<any> {
  return apiGet<any>("/api/gallery", token);
}

/** GET /api/gallery/categories */
export function fetchGalleryCategories(token?: string | null): Promise<any> {
  return apiGet<any>("/api/gallery/categories", token);
}

/** POST /api/gallery (FormData passthrough) */
export function createGalleryItem(
  data: FormData,
  token?: string | null
): Promise<any> {
  return apiPost<any>("/api/gallery", data, token);
}

/** PUT /api/gallery/:id (FormData passthrough) */
export function updateGalleryItem(
  id: string,
  data: FormData,
  token?: string | null
): Promise<any> {
  return apiPut<any>(`/api/gallery/${id}`, data, token);
}

/** DELETE /api/gallery/:id */
export function deleteGalleryItem(
  id: string,
  token?: string | null
): Promise<any> {
  return apiDelete<any>(`/api/gallery/${id}`, token);
}
