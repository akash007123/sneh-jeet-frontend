import { api } from "./apiClient";

/** POST /api/auth/login */
export function loginApi(email: string, password: string): Promise<any> {
  return api.post("/api/auth/login", { email, password }).then((r) => r.data);
}

/** POST /api/auth/signup (multipart FormData) */
export function signupApi(formData: FormData): Promise<any> {
  return api
    .post("/api/auth/signup", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((r) => r.data);
}

/** POST /api/auth/forgot-password */
export function forgotPasswordApi(email: string): Promise<any> {
  return api.post("/api/auth/forgot-password", { email }).then((r) => r.data);
}

/** POST /api/auth/reset-password */
export function resetPasswordApi(token: string, password: string): Promise<any> {
  return api
    .post("/api/auth/reset-password", { token, password })
    .then((r) => r.data);
}
