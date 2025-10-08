import { useMemo, useState } from "react";
import { MOCK_PARKS } from "../mocks/parks";
import { MOCK_PLANTS } from "../mocks/plants";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { PlantCard } from "../components/cards/PlantCard";
import { ArrowLeft, Leaf, Search } from "lucide-react";

interface TamanKoleksiPageProps {
  parkId: string;
  onNavigate: (page: string, slug?: string) => void;
}

export function TamanKoleksiPage({ parkId, onNavigate }: TamanKoleksiPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const park = useMemo(
    () => MOCK_PARKS.find((p) => p.id === Number(parkId)),
    [parkId]
  );

  const plants = useMemo(() => {
    const parkPlants = MOCK_PLANTS.filter(
      (p) => p.taman_kehati_id === Number(parkId) && p.status === "published"
    );

    if (!searchQuery) return parkPlants;

    return parkPlants.filter((plant) => {
      const search = searchQuery.toLowerCase();
      return (
        plant.nama_ilmiah.toLowerCase().includes(search) ||
        plant.nama_umum_nasional.toLowerCase().includes(search) ||
        plant.nama_umum_lokal?.toLowerCase().includes(search) ||
        plant.familia.toLowerCase().includes(search)
      );
    });
  }, [parkId, searchQuery]);

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
        <span className="text-foreground">Koleksi</span>
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
            <h1>Koleksi Tumbuhan</h1>
            <p className="text-muted-foreground">{park.nama_resmi}</p>
          </div>
          <Badge variant="secondary">{plants.length} Spesies</Badge>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama ilmiah, nama umum, atau familia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Plant Collection */}
      {plants.length > 0 ? (
        <div className="grid gap-4">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onClick={() => onNavigate("koleksi-detail", String(plant.id))}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center bg-white">
          <Leaf className="size-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="mb-2">
            {searchQuery
              ? "Tidak ada hasil yang ditemukan"
              : "Belum ada koleksi tumbuhan"}
          </h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? "Coba ubah kata kunci pencarian Anda"
              : "Belum ada koleksi tumbuhan yang terdaftar untuk taman ini"}
          </p>
        </Card>
      )}
    </div>
  );
}
