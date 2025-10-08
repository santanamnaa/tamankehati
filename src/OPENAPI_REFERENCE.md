# OpenAPI Specification Reference

This document describes the API endpoints implemented in `/lib/api.ts` based on the OpenAPI specification.

## Base Configuration

```typescript
API_BASE_URL: http://localhost:8000 (configurable)
Authentication: OAuth2 Password Flow with Bearer Token
```

## Endpoints

### 🔐 Authentication

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```typescript
{
  username: string;
  email: string;
  password: string;
  full_name?: string | null;
  role?: "super_admin" | "admin" | "viewer";
  is_active?: boolean;
}
```

**Response:** `UserResponse`

---

#### POST `/api/auth/login`
Login with username/password. Returns access token.

**Request Body (Form-Encoded):**
```
username: string
password: string
grant_type: "password"
```

**Response:**
```typescript
{
  access_token: string;
  token_type?: string;
}
```

**Note:** Token is automatically stored in `tokenStore` and attached to subsequent requests.

---

#### GET `/api/auth/me`
Get current authenticated user.

**Headers:** `Authorization: Bearer {token}`

**Response:** `UserResponse`

---

### 👥 Users (Super Admin Only)

#### GET `/api/users/`
List all users with pagination.

**Query Parameters:**
- `skip`: number (default: 0)
- `limit`: number (default: 100)

**Response:** `UserResponse[]`

---

#### GET `/api/users/{user_id}`
Get user by ID.

**Response:** `UserResponse`

---

#### POST `/api/users/`
Create a new user.

**Request Body:** `UserCreate`

**Response:** `UserResponse`

---

#### PUT `/api/users/{user_id}`
Update user by ID.

**Request Body:** `UserUpdate`

**Response:** `UserResponse`

---

#### DELETE `/api/users/{user_id}`
Delete user by ID.

**Response:** `{}`

---

### 🌳 Taman Kehati (Biodiversity Parks)

#### GET `/api/taman-kehati/`
List all parks with pagination.

**Query Parameters:**
- `skip`: number (default: 0)
- `limit`: number (default: 100)

**Response:** `TamanKehatiResponse[]`

---

#### GET `/api/taman-kehati/{taman_id}`
Get park by ID.

**Response:** `TamanKehatiResponse`

---

#### POST `/api/taman-kehati/`
Create a new park.

**Request Body:** `TamanKehatiCreate`

**Response:** `TamanKehatiResponse`

---

#### PUT `/api/taman-kehati/{taman_id}`
Update park by ID.

**Request Body:** `TamanKehatiUpdate`

**Response:** `TamanKehatiResponse`

---

#### DELETE `/api/taman-kehati/{taman_id}`
Delete park by ID.

**Response:** `{}`

---

### 🌱 Koleksi Tumbuhan (Plant Collections)

#### GET `/api/koleksi-tumbuhan/`
List all plant collections with pagination.

**Query Parameters:**
- `skip`: number (default: 0)
- `limit`: number (default: 100)

**Response:** `KoleksiTumbuhanResponse[]`

---

#### GET `/api/koleksi-tumbuhan/{koleksi_id}`
Get plant collection by ID.

**Response:** `KoleksiTumbuhanResponse`

---

#### POST `/api/koleksi-tumbuhan/`
Create a new plant collection.

**Request Body:** `KoleksiTumbuhanCreate`

**Response:** `KoleksiTumbuhanResponse`

---

#### PUT `/api/koleksi-tumbuhan/{koleksi_id}`
Update plant collection by ID.

**Request Body:** `KoleksiTumbuhanUpdate`

**Response:** `KoleksiTumbuhanResponse`

---

#### DELETE `/api/koleksi-tumbuhan/{koleksi_id}`
Delete plant collection by ID.

**Response:** `{}`

---

### 📦 Data Export

#### GET `/api/export/dwc`
Export data in Darwin Core Archive format.

**Query Parameters:**
- `skip`: number (default: 0)
- `limit`: number (default: 100)

**Response:** Darwin Core formatted data

---

#### GET `/api/export/geojson`
Export data in GeoJSON format.

**Query Parameters:**
- `skip`: number (default: 0)
- `limit`: number (default: 100)

**Response:** GeoJSON formatted data

---

## Data Models

### UserRoleEnum
```typescript
enum UserRoleEnum {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  VIEWER = "viewer"
}
```

### StatusPublikasiEnum
```typescript
enum StatusPublikasiEnum {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived"
}
```

### TipeTamanEnum
```typescript
enum TipeTamanEnum {
  GOVERNMENT = "government",
  PRIVATE = "private",
  COMMUNITY = "community"
}
```

### UserResponse
```typescript
{
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  role: UserRoleEnum;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

### TamanKehatiResponse
```typescript
{
  id: number;
  nama_resmi: string;
  nama_alternatif: string | null;
  alamat: string | null;
  provinsi_id: number | null;
  kabupaten_kota_id: number | null;
  kecamatan_id: number | null;
  kelurahan_desa_id: number | null;
  kode_pos: string | null;
  latitude: number | null;
  longitude: number | null;
  luas: number | null;
  tipe_taman: TipeTamanEnum | null;
  deskripsi: string | null;
  sejarah: string | null;
  kontak_person: string | null;
  telepon: string | null;
  email: string | null;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  twitter: string | null;
  status: StatusPublikasiEnum;
  created_at: string;
  updated_at: string;
}
```

### KoleksiTumbuhanResponse
```typescript
{
  id: number;
  taman_kehati_id: number;
  nama_ilmiah: string;
  nama_umum_nasional: string | null;
  nama_umum_lokal: string | null;
  familia: string | null;
  genus: string | null;
  spesies: string | null;
  varietas: string | null;
  author: string | null;
  nomor_koleksi: string | null;
  tanggal_koleksi: string | null;
  lokasi_koleksi: string | null;
  habitat: string | null;
  deskripsi: string | null;
  catatan: string | null;
  foto_url: string | null;
  status: StatusPublikasiEnum;
  created_at: string;
  updated_at: string;
}
```

---

## Usage Examples

### Authentication Flow
```typescript
import { auth } from './lib/api';

// Login
await auth.login('admin@example.com', 'password');
// Token is automatically stored

// Get current user
const user = await auth.me();

// Logout
auth.logout();
```

### CRUD Operations
```typescript
import { tamanKehati, koleksi } from './lib/api';

// List parks
const parks = await tamanKehati.list(0, 10);

// Get specific park
const park = await tamanKehati.get(1);

// Create park
const newPark = await tamanKehati.create({
  nama_resmi: "Taman Kehati Baru",
  status: "draft"
});

// Update park
const updated = await tamanKehati.update(1, {
  status: "published"
});

// Delete park
await tamanKehati.delete(1);
```

### Error Handling
```typescript
import { ApiError } from './lib/api';

try {
  const data = await tamanKehati.get(999);
} catch (error) {
  if (error instanceof ApiError) {
    console.log('Status:', error.status);
    console.log('Data:', error.data);
  }
}
```

---

## Testing

Use the **API Test Page** (`/api-test`) to:
1. Configure authentication credentials
2. Test individual endpoints
3. Run full integration flow
4. View request/response details

Set `NEXT_PUBLIC_USE_REAL_API=true` to enable real API calls.
