/**
 * API Configuration
 * Runtime switches for API integration
 */

// Use import.meta.env for Vite/browser environments
// @ts-ignore - import.meta.env may not be available in all environments
const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

export const USE_REAL_API = env.VITE_USE_REAL_API === "true" || false;
export const API_BASE_URL = env.VITE_API_BASE_URL || "http://localhost:8000";

let _token: string | null = null;

export const tokenStore = {
  get: () => _token,
  set: (t: string | null) => {
    _token = t;
    if (typeof window !== "undefined") {
      if (t) {
        localStorage.setItem("auth_token", t);
      } else {
        localStorage.removeItem("auth_token");
      }
    }
  },
  clear: () => {
    _token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  },
  init: () => {
    if (typeof window !== "undefined") {
      _token = localStorage.getItem("auth_token");
    }
  },
};
