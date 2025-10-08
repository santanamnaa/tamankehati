import { useMemo, useState } from "react";
import { MOCK_PARKS } from "../mocks/parks";
import { mockPublications } from "../mocks/publications";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  ArrowLeft,
  FileText,
  Download,
  Calendar,
  Users,
} from "lucide-react";

interface TamanPublikasiPageProps {
  parkId: string;
  onNavigate: (page: string, slug?: string) => void;
}

export function TamanPublikasiPage({
  parkId,
  onNavigate,
}: TamanPublikasiPageProps) {
  const [filterType, setFilterType] = useState<string>("all");

  const park = useMemo(
    () => MOCK_PARKS.find((p) => p.id === Number(parkId)),
    [parkId]
  );

  const publications = useMemo(() => {
    // Match parkId with publication parkId (need to map numeric ID to string)
    // Since mockPublications uses string IDs like 'taman-cibodas', we need to create a mapping
    // For now, we'll filter by park name or add parkId to publications
    const parkPubs = mockPublications.filter(
      (pub) =>
        pub.parkId === `taman-${park?.nama_resmi.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}` ||
        pub.parkName === park?.nama_resmi
    );

    if (filterType === "all") return parkPubs;

    return parkPubs.filter((pub) => pub.type === filterType);
  }, [parkId, filterType, park]);

  if (!park) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2>Taman tidak ditemukan</h2>
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

  const typeLabels: Record<string, string> = {
    all: "Semua",
    laporan_tahunan: "Laporan Tahunan",
    penelitian: "Penelitian",
    dokumentasi: "Dokumentasi",
    jurnal: "Jurnal",
  };

  const typeColors: Record<string, "default" | "secondary" | "outline"> = {
    laporan_tahunan: "default",
    penelitian: "secondary",
    dokumentasi: "outline",
    jurnal: "default",
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button
          onClick={() => onNavigate("taman")}
          className="hover:text-foreground transition-colors"
        >
          Taman
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate("taman-detail", parkId)}
          className="hover:text-foreground transition-colors"
        >
          {park.nama_resmi}
        </button>
        <span>/</span>
        <span className="text-foreground">Publikasi</span>
      </div>

      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => onNavigate("taman-detail", parkId)}
      >
        <ArrowLeft className="size-4 mr-2" />
        Kembali ke Detail Taman
      </Button>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1>Publikasi & Dokumen</h1>
            <p className="text-muted-foreground">{park.nama_resmi}</p>
          </div>
          <Badge variant="secondary">{publications.length} Dokumen</Badge>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Jenis:</span>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="laporan_tahunan">Laporan Tahunan</SelectItem>
              <SelectItem value="penelitian">Penelitian</SelectItem>
              <SelectItem value="dokumentasi">Dokumentasi</SelectItem>
              <SelectItem value="jurnal">Jurnal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Publications List */}
      {publications.length > 0 ? (
        <div className="space-y-4">
          {publications.map((pub) => (
            <Card key={pub.id} className="p-6 bg-white hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start gap-3">
                      <FileText className="size-5 text-primary shrink-0 mt-1" />
                      <div className="space-y-1">
                        <h3>{pub.title}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={typeColors[pub.type]}>
                            {typeLabels[pub.type]}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {pub.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // In real app, this would trigger download
                      alert(`Download: ${pub.title}`);
                    }}
                  >
                    <Download className="size-4 mr-2" />
                    Unduh
                  </Button>
                </div>

                <p className="text-muted-foreground">{pub.abstract}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>{pub.authors.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>
                      {new Date(pub.publishedDate).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {pub.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center bg-white">
          <FileText className="size-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="mb-2">Belum ada publikasi</h3>
          <p className="text-muted-foreground">
            Belum ada publikasi atau dokumen yang tersedia untuk kategori ini
          </p>
        </Card>
      )}
    </div>
  );
}
