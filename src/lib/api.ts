/**
 * API Client - Single source of truth for all API calls
 * Implements OAuth2 password flow and typed endpoints
 */

import { API_BASE_URL, tokenStore } from "./api.config";
import type {
  UserCreate,
  UserResponse,
  UserUpdate,
  TamanKehatiCreate,
  TamanKehatiResponse,
  TamanKehatiUpdate,
  KoleksiTumbuhanCreate,
  KoleksiTumbuhanResponse,
  KoleksiTumbuhanUpdate,
} from "./api.types";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ApiError extends Error {
  constructor(
    public status: number,
    public data: any
  ) {
    super(`HTTP ${status}`);
    this.name = "ApiError";
  }
}

/**
 * Core request wrapper with JSON handling and error normalization
 */
async function request<T>(
  path: string,
  opts: {
    method?: HttpMethod;
    body?: any;
    form?: URLSearchParams;
  } = {}
): Promise<T> {
  const headers: Record<string, string> = {};
  const token = tokenStore.get();

  if (!opts.form) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: opts.method ?? "GET",
    headers,
    body: opts.form ? opts.form : opts.body ? JSON.stringify(opts.body) : undefined,
    cache: "no-store",
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    throw new ApiError(res.status, data);
  }

  return data as T;
}

/** AUTH - OAuth2 Password Flow */
export const auth = {
  /**
   * Register a new user
   */
  register: (payload: UserCreate) =>
    request<UserResponse>("/api/auth/register", {
      method: "POST",
      body: payload,
    }),

  /**
   * Login with username/password, stores token
   */
  login: async (username: string, password: string) => {
    const form = new URLSearchParams({
      username,
      password,
      grant_type: "password",
    });

    const data = await request<{
      access_token: string;
      token_type?: string;
    }>("/api/auth/login", {
      method: "POST",
      form,
    });

    tokenStore.set(data.access_token);
    return data;
  },

  /**
   * Get current authenticated user
   */
  me: () => request<UserResponse>("/api/auth/me"),

  /**
   * Clear local token
   */
  logout: () => {
    tokenStore.clear();
  },
};

/** USERS - Super Admin only */
export const users = {
  /**
   * List all users with pagination
   */
  list: (skip = 0, limit = 100) =>
    request<UserResponse[]>(`/api/users/?skip=${skip}&limit=${limit}`),

  /**
   * Get user by ID
   */
  get: (user_id: string) => request<UserResponse>(`/api/users/${user_id}`),

  /**
   * Create new user
   */
  create: (payload: UserCreate) =>
    request<UserResponse>(`/api/users/`, {
      method: "POST",
      body: payload,
    }),

  /**
   * Update user by ID
   */
  update: (user_id: string, payload: UserUpdate) =>
    request<UserResponse>(`/api/users/${user_id}`, {
      method: "PUT",
      body: payload,
    }),

  /**
   * Delete user by ID
   */
  delete: (user_id: string) =>
    request<{}>(`/api/users/${user_id}`, {
      method: "DELETE",
    }),
};

/** TAMAN KEHATI */
export const tamanKehati = {
  /**
   * List all parks with pagination
   */
  list: (skip = 0, limit = 100) =>
    request<TamanKehatiResponse[]>(`/api/taman-kehati/?skip=${skip}&limit=${limit}`),

  /**
   * Get park by ID
   */
  get: (taman_id: number) =>
    request<TamanKehatiResponse>(`/api/taman-kehati/${taman_id}`),

  /**
   * Create new park
   */
  create: (payload: TamanKehatiCreate) =>
    request<TamanKehatiResponse>(`/api/taman-kehati/`, {
      method: "POST",
      body: payload,
    }),

  /**
   * Update park by ID
   */
  update: (taman_id: number, payload: TamanKehatiUpdate) =>
    request<TamanKehatiResponse>(`/api/taman-kehati/${taman_id}`, {
      method: "PUT",
      body: payload,
    }),

  /**
   * Delete park by ID
   */
  delete: (taman_id: number) =>
    request<{}>(`/api/taman-kehati/${taman_id}`, {
      method: "DELETE",
    }),
};

/** KOLEKSI TUMBUHAN */
export const koleksi = {
  /**
   * List all plant collections with pagination
   */
  list: (skip = 0, limit = 100) =>
    request<KoleksiTumbuhanResponse[]>(
      `/api/koleksi-tumbuhan/?skip=${skip}&limit=${limit}`
    ),

  /**
   * Get plant collection by ID
   */
  get: (koleksi_id: number) =>
    request<KoleksiTumbuhanResponse>(`/api/koleksi-tumbuhan/${koleksi_id}`),

  /**
   * Create new plant collection
   */
  create: (payload: KoleksiTumbuhanCreate) =>
    request<KoleksiTumbuhanResponse>(`/api/koleksi-tumbuhan/`, {
      method: "POST",
      body: payload,
    }),

  /**
   * Update plant collection by ID
   */
  update: (koleksi_id: number, payload: KoleksiTumbuhanUpdate) =>
    request<KoleksiTumbuhanResponse>(`/api/koleksi-tumbuhan/${koleksi_id}`, {
      method: "PUT",
      body: payload,
    }),

  /**
   * Delete plant collection by ID
   */
  delete: (koleksi_id: number) =>
    request<{}>(`/api/koleksi-tumbuhan/${koleksi_id}`, {
      method: "DELETE",
    }),
};

/** EXPORTS */
export const dataExport = {
  /**
   * Export data in Darwin Core format
   */
  dwc: (skip = 0, limit = 100) =>
    request<any>(`/api/export/dwc?skip=${skip}&limit=${limit}`),

  /**
   * Export data in GeoJSON format
   */
  geojson: (skip = 0, limit = 100) =>
    request<any>(`/api/export/geojson?skip=${skip}&limit=${limit}`),
};
