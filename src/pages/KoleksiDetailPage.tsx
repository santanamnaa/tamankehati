import { useMemo } from "react";
import { MOCK_PLANTS } from "../mocks/plants";
import { MOCK_PARKS } from "../mocks/parks";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, MapPin, Calendar, FileText, Leaf } from "lucide-react";

interface KoleksiDetailPageProps {
  plantId: string;
  onNavigate: (page: string, slug?: string) => void;
}

export function KoleksiDetailPage({
  plantId,
  onNavigate,
}: KoleksiDetailPageProps) {
  const plant = useMemo(
    () => MOCK_PLANTS.find((p) => p.id === Number(plantId)),
    [plantId]
  );

  const park = useMemo(
    () =>
      plant ? MOCK_PARKS.find((p) => p.id === plant.taman_kehati_id) : null,
    [plant]
  );

  if (!plant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl mb-2">Koleksi tidak ditemukan</h2>
          <p className="text-muted-foreground mb-6">
            Koleksi tumbuhan yang Anda cari tidak tersedia
          </p>
          <Button onClick={() => onNavigate("koleksi")}>
            <ArrowLeft className="size-4 mr-2" />
            Kembali ke Daftar Koleksi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => onNavigate("koleksi")}>
        <ArrowLeft className="size-4 mr-2" />
        Kembali
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl italic">{plant.nama_ilmiah}</h1>
                {plant.nama_umum_nasional && (
                  <p className="text-xl text-muted-foreground">
                    {plant.nama_umum_nasional}
                  </p>
                )}
                {plant.nama_umum_lokal && (
                  <p className="text-lg text-muted-foreground">
                    Nama Lokal: {plant.nama_umum_lokal}
                  </p>
                )}
              </div>
              <Badge
                variant={plant.status === "published" ? "default" : "secondary"}
              >
                {plant.status === "published" ? "Published" : "Draft"}
              </Badge>
            </div>

            {/* Taxonomy */}
            <div className="flex flex-wrap gap-2">
              {plant.familia && (
                <Badge variant="outline">Familia: {plant.familia}</Badge>
              )}
              {plant.genus && (
                <Badge variant="outline">Genus: {plant.genus}</Badge>
              )}
              {plant.spesies && (
                <Badge variant="outline">Spesies: {plant.spesies}</Badge>
              )}
              {plant.varietas && (
                <Badge variant="outline">Varietas: {plant.varietas}</Badge>
              )}
            </div>
          </div>

          {/* Description */}
          {plant.deskripsi && (
            <Card className="p-6 bg-white">
              <h2 className="text-xl mb-3">Deskripsi</h2>
              <p className="text-muted-foreground leading-relaxed">
                {plant.deskripsi}
              </p>
            </Card>
          )}

          {/* Habitat */}
          {plant.habitat && (
            <Card className="p-6 bg-white">
              <h2 className="text-xl mb-3">Habitat</h2>
              <p className="text-muted-foreground leading-relaxed">
                {plant.habitat}
              </p>
            </Card>
          )}

          {/* Notes */}
          {plant.catatan && (
            <Card className="p-6 bg-white">
              <h2 className="text-xl mb-3">Catatan</h2>
              <p className="text-muted-foreground leading-relaxed">
                {plant.catatan}
              </p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Park Info */}
          {park && (
            <Card className="p-6 space-y-4 bg-white">
              <h3 className="text-lg">Taman Kehati</h3>
              <div>
                <div className="text-sm mb-2">{park.nama_resmi}</div>
                {park.alamat && (
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4 shrink-0 mt-0.5" />
                    <span>{park.alamat}</span>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onNavigate("taman-detail", String(park.id))}
              >
                Lihat Detail Taman
              </Button>
            </Card>
          )}

          {/* Collection Info */}
          <Card className="p-6 space-y-4 bg-white">
            <h3 className="text-lg">Informasi Koleksi</h3>

            {plant.nomor_koleksi && (
              <div className="flex gap-3">
                <FileText className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Nomor Koleksi
                  </div>
                  <div className="text-sm">{plant.nomor_koleksi}</div>
                </div>
              </div>
            )}

            {plant.tanggal_koleksi && (
              <div className="flex gap-3">
                <Calendar className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Tanggal Koleksi
                  </div>
                  <div className="text-sm">
                    {new Date(plant.tanggal_koleksi).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </div>
            )}

            {plant.lokasi_koleksi && (
              <div className="flex gap-3">
                <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Lokasi Koleksi
                  </div>
                  <div className="text-sm">{plant.lokasi_koleksi}</div>
                </div>
              </div>
            )}
          </Card>

          {/* Taxonomy Detail */}
          <Card className="p-6 space-y-3 bg-white">
            <h3 className="text-lg">Klasifikasi</h3>
            <div className="space-y-3 text-sm">
              {plant.familia && (
                <div>
                  <div className="text-muted-foreground">Familia</div>
                  <div>{plant.familia}</div>
                </div>
              )}
              {plant.genus && (
                <div>
                  <div className="text-muted-foreground">Genus</div>
                  <div className="italic">{plant.genus}</div>
                </div>
              )}
              {plant.spesies && (
                <div>
                  <div className="text-muted-foreground">Spesies</div>
                  <div className="italic">{plant.spesies}</div>
                </div>
              )}
              {plant.varietas && (
                <div>
                  <div className="text-muted-foreground">Varietas</div>
                  <div>{plant.varietas}</div>
                </div>
              )}
              {plant.author && (
                <div>
                  <div className="text-muted-foreground">Authority</div>
                  <div>{plant.author}</div>
                </div>
              )}
            </div>
          </Card>

          {/* Metadata */}
          <Card className="p-6 space-y-3 bg-white">
            <h3 className="text-lg">Metadata</h3>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <Calendar className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="text-muted-foreground">Dibuat</div>
                  <div>
                    {new Date(plant.created_at).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Calendar className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="text-muted-foreground">Diperbarui</div>
                  <div>
                    {new Date(plant.updated_at).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
