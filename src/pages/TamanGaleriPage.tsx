import { useMemo, useState } from "react";
import { MOCK_PARKS } from "../mocks/parks";
import { MOCK_GALLERIES } from "../mocks/galleries";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ArrowLeft, Image as ImageIcon, Camera } from "lucide-react";

interface TamanGaleriPageProps {
  parkId: string;
  onNavigate: (page: string, slug?: string) => void;
}

export function TamanGaleriPage({ parkId, onNavigate }: TamanGaleriPageProps) {
  const [filterType, setFilterType] = useState<string>("all");

  const park = useMemo(
    () => MOCK_PARKS.find((p) => p.id === Number(parkId)),
    [parkId]
  );

  const galleries = useMemo(() => {
    const parkGalleries = MOCK_GALLERIES.filter(
      (g) => g.tamanKehatiId === Number(parkId)
    );

    if (filterType === "all") return parkGalleries;

    return parkGalleries.filter((g) => g.type === filterType);
  }, [parkId, filterType]);

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
    kegiatan: "Kegiatan",
    flora: "Flora",
    fauna: "Fauna",
    infrastruktur: "Infrastruktur",
    event: "Event",
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
        <span className="text-foreground">Galeri</span>
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
            <h1>Galeri Foto & Dokumentasi</h1>
            <p className="text-muted-foreground">{park.nama_resmi}</p>
          </div>
          <Badge variant="secondary">{galleries.length} Foto</Badge>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Kategori:</span>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="kegiatan">Kegiatan</SelectItem>
              <SelectItem value="flora">Flora</SelectItem>
              <SelectItem value="fauna">Fauna</SelectItem>
              <SelectItem value="infrastruktur">Infrastruktur</SelectItem>
              <SelectItem value="event">Event</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Gallery Grid */}
      {galleries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-white group">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                    {typeLabels[item.type]}
                  </Badge>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span>
                      {new Date(item.capturedDate).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {item.photographer && (
                      <span className="flex items-center gap-1">
                        <Camera className="size-3" />
                        {item.photographer}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center bg-white">
          <ImageIcon className="size-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="mb-2">Belum ada foto</h3>
          <p className="text-muted-foreground">
            Belum ada foto atau dokumentasi yang tersedia untuk kategori ini
          </p>
        </Card>
      )}
    </div>
  );
}
