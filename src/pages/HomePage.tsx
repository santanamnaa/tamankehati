import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Leaf, Map, Sprout, TrendingUp, Shield, MapPin, FileText, Sparkles, Info } from "lucide-react";
import { MOCK_PARKS } from "../mocks/parks";
import { MOCK_PLANTS } from "../mocks/plants";

interface HomePageProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const stats = [
    {
      label: "Taman Kehati",
      value: MOCK_PARKS.filter((p) => p.status === "published").length,
      icon: Map,
      color: "text-emerald-600",
    },
    {
      label: "Koleksi Tumbuhan",
      value: MOCK_PLANTS.filter((p) => p.status === "published").length,
      icon: Sprout,
      color: "text-green-600",
    },
    {
      label: "Provinsi",
      value: new Set(MOCK_PARKS.map((p) => p.provinsi_id).filter(Boolean)).size,
      icon: TrendingUp,
      color: "text-lime-600",
    },
    {
      label: "Spesies Dilindungi",
      value: MOCK_PLANTS.filter((p) =>
        p.catatan?.toLowerCase().includes("dilindungi")
      ).length,
      icon: Shield,
      color: "text-teal-600",
    },
  ];

  const featuredParks = MOCK_PARKS.filter((p) => p.status === "published").slice(
    0,
    3
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-12">
        <div className="inline-flex items-center justify-center size-20 rounded-2xl bg-primary mb-4">
          <Leaf className="size-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl">Taman Kehati Indonesia</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Platform digital untuk dokumentasi, konservasi, dan edukasi
          keanekaragaman hayati Indonesia melalui Taman Kehati
        </p>
        <div className="flex flex-wrap gap-3 justify-center pt-4">
          <Button size="lg" onClick={() => onNavigate("taman")}>
            <Map className="size-5 mr-2" />
            Jelajahi Taman
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate("peta")}
          >
            <MapPin className="size-5 mr-2" />
            Lihat Peta
          </Button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6 text-center bg-white">
              <Icon className={`size-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-3xl mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          );
        })}
      </section>

      {/* Featured Parks */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Taman Kehati Unggulan</h2>
            <p className="text-muted-foreground">
              Taman konservasi keanekaragaman hayati terpilih
            </p>
          </div>
          <Button variant="outline" onClick={() => onNavigate("taman")}>
            Lihat Semua
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredParks.map((park) => (
            <Card
              key={park.id}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white"
              onClick={() => onNavigate("taman-detail", String(park.id))}
            >
              <h3 className="text-lg mb-2">{park.nama_resmi}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {park.deskripsi}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Map className="size-4 text-primary" />
                <span className="text-muted-foreground">{park.alamat}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white rounded-xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl">Tentang Taman Kehati</h2>
          <p className="text-muted-foreground">
            Taman Kehati (Taman Keanekaragaman Hayati) adalah ruang hijau yang
            dirancang khusus untuk konservasi keanekaragaman hayati Indonesia.
            Platform ini mendokumentasikan taman-taman kehati di seluruh
            Indonesia beserta koleksi tumbuhan yang mereka miliki, mendukung
            upaya pelestarian dan edukasi lingkungan.
          </p>
          <div className="grid md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-2">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="size-6 text-primary" />
              </div>
              <h3 className="text-base">Konservasi</h3>
              <p className="text-sm text-muted-foreground">
                Melindungi spesies tumbuhan langka dan endemik Indonesia
              </p>
            </div>
            <div className="space-y-2">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Sprout className="size-6 text-primary" />
              </div>
              <h3 className="text-base">Dokumentasi</h3>
              <p className="text-sm text-muted-foreground">
                Sistem katalog digital koleksi tumbuhan yang terstandarisasi
              </p>
            </div>
            <div className="space-y-2">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <TrendingUp className="size-6 text-primary" />
              </div>
              <h3 className="text-base">Edukasi</h3>
              <p className="text-sm text-muted-foreground">
                Meningkatkan kesadaran masyarakat tentang keanekaragaman hayati
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("peta")}>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <MapPin className="size-6 text-primary" />
          </div>
          <h3 className="mb-2">Peta Interaktif</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Jelajahi persebaran taman konservasi dan koleksi tanaman di seluruh Indonesia dengan peta interaktif
          </p>
          <Button variant="outline" size="sm">
            Buka Peta →
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("publikasi")}>
          <div className="w-12 h-12 rounded-lg bg-chart-1/10 flex items-center justify-center mb-4">
            <FileText className="size-6 text-chart-1" />
          </div>
          <h3 className="mb-2">Publikasi & Data</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Akses publikasi ilmiah, laporan tahunan, dan dataset terbuka untuk penelitian biodiversitas
          </p>
          <Button variant="outline" size="sm">
            Lihat Publikasi →
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("ai-assistant")}>
          <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
            <Sparkles className="size-6 text-secondary" />
          </div>
          <h3 className="mb-2">AI Assistant</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Gunakan asisten cerdas untuk mencari informasi tentang tanaman, taman, dan publikasi
          </p>
          <Button variant="outline" size="sm">
            Coba AI Assistant →
          </Button>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-chart-1 text-primary-foreground rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl mb-3">Pelajari Lebih Lanjut</h2>
        <p className="mb-6 max-w-2xl mx-auto opacity-90">
          Kenali lebih dalam tentang Taman Kehati Indonesia, regulasi konservasi, dan tim yang bekerja untuk pelestarian keanekaragaman hayati
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            onClick={() => onNavigate("tentang")}
          >
            <Info className="size-5 mr-2" />
            Tentang Kami
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => onNavigate("kontak")}
          >
            Hubungi Kami
          </Button>
        </div>
      </section>
    </div>
  );
}
