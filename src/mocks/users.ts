import type { UserResponse } from "../lib/api.types";

export const MOCK_USERS: UserResponse[] = [
  {
    id: "user-001",
    username: "admin",
    email: "admin@tamankehati.id",
    full_name: "Administrator",
    role: "super_admin",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "user-002",
    username: "curator_jakarta",
    email: "curator.jkt@tamankehati.id",
    full_name: "Dr. Budi Santoso",
    role: "admin",
    is_active: true,
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z",
  },
  {
    id: "user-003",
    username: "viewer_public",
    email: "public@tamankehati.id",
    full_name: "Public Viewer",
    role: "viewer",
    is_active: true,
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-02-01T00:00:00Z",
  },
];
