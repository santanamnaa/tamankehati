import { useState, useMemo } from "react";
import { MOCK_PARKS } from "../mocks/parks";
import { ParkCard } from "../components/cards/ParkCard";
import { SearchFilter } from "../components/filters/SearchFilter";
import { StatusFilter } from "../components/filters/StatusFilter";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Map } from "lucide-react";

interface TamanListPageProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function TamanListPage({ onNavigate }: TamanListPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredParks = useMemo(() => {
    return MOCK_PARKS.filter((park) => {
      const matchesSearch =
        searchQuery === "" ||
        park.nama_resmi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        park.nama_alternatif?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        park.alamat?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || park.status === statusFilter;

      const matchesType =
        typeFilter === "all" || park.tipe_taman === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-lg bg-primary flex items-center justify-center">
            <Map className="size-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl">Taman Kehati</h1>
            <p className="text-muted-foreground">
              Daftar taman keanekaragaman hayati di Indonesia
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
            placeholder="Cari taman kehati..."
          />
        </div>
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Semua Tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tipe</SelectItem>
            <SelectItem value="government">Pemerintah</SelectItem>
            <SelectItem value="private">Swasta</SelectItem>
            <SelectItem value="community">Komunitas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Menampilkan {filteredParks.length} dari {MOCK_PARKS.length} taman
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSearchQuery("");
            setStatusFilter("all");
            setTypeFilter("all");
          }}
        >
          Reset Filter
        </Button>
      </div>

      {/* Parks Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParks.map((park) => (
          <ParkCard
            key={park.id}
            park={park}
            onClick={() => onNavigate("taman-detail", String(park.id))}
          />
        ))}
      </div>

      {filteredParks.length === 0 && (
        <div className="text-center py-12">
          <Map className="size-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg mb-2">Tidak ada taman ditemukan</h3>
          <p className="text-muted-foreground mb-4">
            Coba ubah kriteria pencarian Anda
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setTypeFilter("all");
            }}
          >
            Reset Filter
          </Button>
        </div>
      )}
    </div>
  );
}
