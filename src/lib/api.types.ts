/**
 * TypeScript types derived from OpenAPI schema
 */

// Enums
export enum UserRoleEnum {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  VIEWER = "viewer",
}

export enum StatusPublikasiEnum {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export enum TipeTamanEnum {
  GOVERNMENT = "government",
  PRIVATE = "private",
  COMMUNITY = "community",
}

// User schemas
export interface UserCreate {
  username: string;
  email: string;
  password: string;
  full_name?: string | null;
  role?: UserRoleEnum;
  is_active?: boolean;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
  full_name?: string | null;
  role?: UserRoleEnum;
  is_active?: boolean;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  role: UserRoleEnum;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Taman Kehati schemas
export interface TamanKehatiCreate {
  nama_resmi: string;
  nama_alternatif?: string | null;
  alamat?: string | null;
  provinsi_id?: number | null;
  kabupaten_kota_id?: number | null;
  kecamatan_id?: number | null;
  kelurahan_desa_id?: number | null;
  kode_pos?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  luas?: number | null;
  tipe_taman?: TipeTamanEnum | null;
  deskripsi?: string | null;
  sejarah?: string | null;
  kontak_person?: string | null;
  telepon?: string | null;
  email?: string | null;
  website?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  status?: StatusPublikasiEnum;
}

export interface TamanKehatiUpdate {
  nama_resmi?: string;
  nama_alternatif?: string | null;
  alamat?: string | null;
  provinsi_id?: number | null;
  kabupaten_kota_id?: number | null;
  kecamatan_id?: number | null;
  kelurahan_desa_id?: number | null;
  kode_pos?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  luas?: number | null;
  tipe_taman?: TipeTamanEnum | null;
  deskripsi?: string | null;
  sejarah?: string | null;
  kontak_person?: string | null;
  telepon?: string | null;
  email?: string | null;
  website?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  status?: StatusPublikasiEnum;
}

export interface TamanKehatiResponse {
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

// Koleksi Tumbuhan schemas
export interface KoleksiTumbuhanCreate {
  taman_kehati_id: number;
  nama_ilmiah: string;
  nama_umum_nasional?: string | null;
  nama_umum_lokal?: string | null;
  familia?: string | null;
  genus?: string | null;
  spesies?: string | null;
  varietas?: string | null;
  author?: string | null;
  nomor_koleksi?: string | null;
  tanggal_koleksi?: string | null;
  lokasi_koleksi?: string | null;
  habitat?: string | null;
  deskripsi?: string | null;
  catatan?: string | null;
  foto_url?: string | null;
  status?: StatusPublikasiEnum;
}

export interface KoleksiTumbuhanUpdate {
  taman_kehati_id?: number;
  nama_ilmiah?: string;
  nama_umum_nasional?: string | null;
  nama_umum_lokal?: string | null;
  familia?: string | null;
  genus?: string | null;
  spesies?: string | null;
  varietas?: string | null;
  author?: string | null;
  nomor_koleksi?: string | null;
  tanggal_koleksi?: string | null;
  lokasi_koleksi?: string | null;
  habitat?: string | null;
  deskripsi?: string | null;
  catatan?: string | null;
  foto_url?: string | null;
  status?: StatusPublikasiEnum;
}

export interface KoleksiTumbuhanResponse {
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
