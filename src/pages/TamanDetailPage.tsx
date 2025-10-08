import { useMemo } from "react";
import { MOCK_PARKS } from "../mocks/parks";
import { MOCK_PLANTS } from "../mocks/plants";
import { MOCK_GALLERIES } from "../mocks/galleries";
import { mockPublications } from "../mocks/publications";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { PlantCard } from "../components/cards/PlantCard";
import {
  MapPin,
  Leaf,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  FileText,
  ChevronRight,
} from "lucide-react";

interface TamanDetailPageProps {
  parkId: string;
  onNavigate: (page: string, slug?: string) => void;
}

export function TamanDetailPage({ parkId, onNavigate }: TamanDetailPageProps) {
  const park = useMemo(
    () => MOCK_PARKS.find((p) => p.id === Number(parkId)),
    [parkId]
  );

  const plants = useMemo(
    () =>
      MOCK_PLANTS.filter((p) => p.taman_kehati_id === Number(parkId) && p.status === "published"),
    [parkId]
  );

  const galleries = useMemo(
    () => MOCK_GALLERIES.filter((g) => g.tamanKehatiId === Number(parkId)),
    [parkId]
  );

  const publications = useMemo(
    () =>
      mockPublications.filter(
        (pub) =>
          pub.parkId ===
            `taman-${park?.nama_resmi
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "")}` || pub.parkName === park?.nama_resmi
      ),
    [parkId, park]
  );

  if (!park) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl mb-2">Taman tidak ditemukan</h2>
          <p className="text-muted-foreground mb-6">
            Taman yang Anda cari tidak tersedia
          </p>
          <Button onClick={() => onNavigate("taman")}>
            <ArrowLeft className="size-4 mr-2" />
            Kembali ke Daftar Taman
          </Button>
        </div>
      </div>
    );
  }

  const tipeTamanLabel = {
    government: "Pemerintah",
    private: "Swasta",
    community: "Komunitas",
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => onNavigate("taman")}>
        <ArrowLeft className="size-4 mr-2" />
        Kembali
      </Button>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl">{park.nama_resmi}</h1>
            {park.nama_alternatif && (
              <p className="text-lg text-muted-foreground italic">
                {park.nama_alternatif}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Badge
              variant={park.status === "published" ? "default" : "secondary"}
            >
              {park.status === "published" ? "Published" : "Draft"}
            </Badge>
            {park.tipe_taman && (
              <Badge variant="outline">
                {tipeTamanLabel[park.tipe_taman]}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          {park.deskripsi && (
            <Card className="p-6 bg-white">
              <h2 className="mb-3">Deskripsi</h2>
              <p className="text-muted-foreground leading-relaxed">
                {park.deskripsi}
              </p>
            </Card>
          )}

          {/* History */}
          {park.sejarah && (
            <Card className="p-6 bg-white">
              <h2 className="mb-3">Sejarah</h2>
              <p className="text-muted-foreground leading-relaxed">
                {park.sejarah}
              </p>
            </Card>
          )}

          {/* Quick Links to Sub-pages */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Koleksi Link */}
            <Card
              className="p-6 bg-white hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate("taman-koleksi", parkId)}
            >
              <div className="flex items-start justify-between mb-3">
                <Leaf className="size-8 text-primary" />
                <Badge variant="secondary">{plants.length}</Badge>
              </div>
              <h3 className="mb-2">Koleksi Tumbuhan</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Lihat semua spesies tumbuhan di taman ini
              </p>
              <div className="flex items-center text-sm text-primary">
                <span>Lihat Koleksi</span>
                <ChevronRight className="size-4 ml-1" />
              </div>
            </Card>

            {/* Galeri Link */}
            <Card
              className="p-6 bg-white hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate("taman-galeri", parkId)}
            >
              <div className="flex items-start justify-between mb-3">
                <ImageIcon className="size-8 text-primary" />
                <Badge variant="secondary">{galleries.length}</Badge>
              </div>
              <h3 className="mb-2">Galeri</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Foto dan dokumentasi kegiatan
              </p>
              <div className="flex items-center text-sm text-primary">
                <span>Lihat Galeri</span>
                <ChevronRight className="size-4 ml-1" />
              </div>
            </Card>

            {/* Publikasi Link */}
            <Card
              className="p-6 bg-white hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate("taman-publikasi", parkId)}
            >
              <div className="flex items-start justify-between mb-3">
                <FileText className="size-8 text-primary" />
                <Badge variant="secondary">{publications.length}</Badge>
              </div>
              <h3 className="mb-2">Publikasi</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Dokumen dan laporan penelitian
              </p>
              <div className="flex items-center text-sm text-primary">
                <span>Lihat Publikasi</span>
                <ChevronRight className="size-4 ml-1" />
              </div>
            </Card>
          </div>

          {/* Plant Collection Preview */}
          {plants.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2>Koleksi Tumbuhan Terbaru</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate("taman-koleksi", parkId)}
                >
                  Lihat Semua
                  <ChevronRight className="size-4 ml-1" />
                </Button>
              </div>

              <div className="grid gap-4">
                {plants.slice(0, 3).map((plant) => (
                  <PlantCard
                    key={plant.id}
                    plant={plant}
                    onClick={() =>
                      onNavigate("koleksi-detail", String(plant.id))
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Location Info */}
          <Card className="p-6 space-y-4 bg-white">
            <h3 className="text-lg">Informasi Lokasi</h3>

            {park.alamat && (
              <div className="flex gap-3">
                <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Alamat
                  </div>
                  <div className="text-sm">{park.alamat}</div>
                  {park.kode_pos && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {park.kode_pos}
                    </div>
                  )}
                </div>
              </div>
            )}

            {park.luas && (
              <div className="flex gap-3">
                <Leaf className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Luas Area
                  </div>
                  <div className="text-sm">{park.luas} hektar</div>
                </div>
              </div>
            )}

            {(park.latitude && park.longitude) && (
              <div className="flex gap-3">
                <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Koordinat
                  </div>
                  <div className="text-sm">
                    {park.latitude}, {park.longitude}
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Contact Info */}
          {(park.kontak_person || park.telepon || park.email) && (
            <Card className="p-6 space-y-4 bg-white">
              <h3 className="text-lg">Kontak</h3>

              {park.kontak_person && (
                <div className="text-sm">
                  <div className="text-muted-foreground mb-1">
                    Kontak Person
                  </div>
                  <div>{park.kontak_person}</div>
                </div>
              )}

              {park.telepon && (
                <div className="flex gap-3">
                  <Phone className="size-5 text-primary shrink-0" />
                  <a href={`tel:${park.telepon}`} className="text-sm hover:underline">
                    {park.telepon}
                  </a>
                </div>
              )}

              {park.email && (
                <div className="flex gap-3">
                  <Mail className="size-5 text-primary shrink-0" />
                  <a
                    href={`mailto:${park.email}`}
                    className="text-sm hover:underline"
                  >
                    {park.email}
                  </a>
                </div>
              )}
            </Card>
          )}

          {/* Social Media */}
          {(park.website || park.instagram || park.facebook || park.twitter) && (
            <Card className="p-6 space-y-4 bg-white">
              <h3 className="text-lg">Media Sosial</h3>

              {park.website && (
                <div className="flex gap-3">
                  <Globe className="size-5 text-primary shrink-0" />
                  <a
                    href={park.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {park.website}
                  </a>
                </div>
              )}

              {park.instagram && (
                <div className="flex gap-3">
                  <Instagram className="size-5 text-primary shrink-0" />
                  <a
                    href={`https://instagram.com/${park.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {park.instagram}
                  </a>
                </div>
              )}

              {park.facebook && (
                <div className="flex gap-3">
                  <Facebook className="size-5 text-primary shrink-0" />
                  <span className="text-sm">{park.facebook}</span>
                </div>
              )}
            </Card>
          )}

          {/* Metadata */}
          <Card className="p-6 space-y-3 bg-white">
            <h3 className="text-lg">Metadata</h3>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <Calendar className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="text-muted-foreground">Dibuat</div>
                  <div>{new Date(park.created_at).toLocaleDateString("id-ID")}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Calendar className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="text-muted-foreground">Diperbarui</div>
                  <div>{new Date(park.updated_at).toLocaleDateString("id-ID")}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
