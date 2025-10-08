import { useState, useMemo } from "react";
import { MOCK_PLANTS } from "../mocks/plants";
import { MOCK_PARKS } from "../mocks/parks";
import { PlantCard } from "../components/cards/PlantCard";
import { SearchFilter } from "../components/filters/SearchFilter";
import { StatusFilter } from "../components/filters/StatusFilter";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Sprout } from "lucide-react";

interface KoleksiListPageProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function KoleksiListPage({ onNavigate }: KoleksiListPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [parkFilter, setParkFilter] = useState("all");

  const filteredPlants = useMemo(() => {
    return MOCK_PLANTS.filter((plant) => {
      const matchesSearch =
        searchQuery === "" ||
        plant.nama_ilmiah.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.nama_umum_nasional?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.nama_umum_lokal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.familia?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.genus?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || plant.status === statusFilter;

      const matchesPark =
        parkFilter === "all" ||
        plant.taman_kehati_id === Number(parkFilter);

      return matchesSearch && matchesStatus && matchesPark;
    });
  }, [searchQuery, statusFilter, parkFilter]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-lg bg-primary flex items-center justify-center">
            <Sprout className="size-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl">Koleksi Tumbuhan</h1>
            <p className="text-muted-foreground">
              Katalog koleksi tumbuhan di seluruh Taman Kehati Indonesia
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchFilter
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari nama ilmiah, nama umum, familia..."
          />
        </div>
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        <Select value={parkFilter} onValueChange={setParkFilter}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="Semua Taman" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Taman</SelectItem>
            {MOCK_PARKS.map((park) => (
              <SelectItem key={park.id} value={String(park.id)}>
                {park.nama_resmi}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Menampilkan {filteredPlants.length} dari {MOCK_PLANTS.length} koleksi
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSearchQuery("");
            setStatusFilter("all");
            setParkFilter("all");
          }}
        >
          Reset Filter
        </Button>
      </div>

      {/* Plants Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlants.map((plant) => {
          const park = MOCK_PARKS.find((p) => p.id === plant.taman_kehati_id);
          return (
            <PlantCard
              key={plant.id}
              plant={plant}
              parkName={park?.nama_resmi}
              onClick={() => onNavigate("koleksi-detail", String(plant.id))}
            />
          );
        })}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-12">
          <Sprout className="size-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg mb-2">Tidak ada koleksi ditemukan</h3>
          <p className="text-muted-foreground mb-4">
            Coba ubah kriteria pencarian Anda
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setParkFilter("all");
            }}
          >
            Reset Filter
          </Button>
        </div>
      )}
    </div>
  );
}
