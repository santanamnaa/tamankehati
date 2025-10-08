import { Leaf, Target, Eye, Users, Award, BookOpen, ExternalLink } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface NavigateFunction {
  (page: string, slug?: string): void;
}

interface TentangPageProps {
  onNavigate: NavigateFunction;
}

export function TentangPage({ onNavigate }: TentangPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Leaf className="w-16 h-16 mx-auto mb-4" />
          <h1 className="mb-4">Tentang Taman Kehati Indonesia</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Platform nasional untuk konservasi, penelitian, dan edukasi keanekaragaman hayati Indonesia
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Introduction */}
        <Card className="p-8 mb-8">
          <h2 className="mb-4">Apa itu Taman Kehati?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Taman Kehati (Keanekaragaman Hayati) Indonesia adalah jaringan kawasan konservasi ex-situ 
            yang tersebar di berbagai wilayah Indonesia. Taman-taman ini berperan penting dalam pelestarian 
            keanekaragaman hayati melalui koleksi, penelitian, pengembangan, dan edukasi publik.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Sebagai negara mega-biodiversitas, Indonesia memiliki tanggung jawab global untuk melindungi 
            kekayaan alamnya. Taman Kehati menjadi garda terdepan dalam upaya konservasi spesies langka 
            dan terancam punah, sekaligus menjadi pusat penelitian dan pengembangan ilmu pengetahuan 
            bidang botani dan ekologi.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Platform digital ini dikembangkan untuk menyediakan akses terbuka terhadap informasi koleksi 
            tanaman, lokasi taman, publikasi ilmiah, dan data konservasi yang dapat dimanfaatkan oleh 
            peneliti, akademisi, pembuat kebijakan, dan masyarakat umum.
          </p>
        </Card>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3>Visi</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Menjadi pusat unggulan konservasi keanekaragaman hayati Indonesia yang berkelanjutan, 
              berbasis ilmu pengetahuan, dan memberikan manfaat bagi kesejahteraan masyarakat.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3>Misi</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Melakukan konservasi ex-situ spesies tumbuhan Indonesia</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Mengembangkan penelitian biodiversitas dan ekologi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Menyediakan edukasi dan meningkatkan kesadaran publik</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Mendukung kebijakan konservasi nasional</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Key Features */}
        <Card className="p-8 mb-8">
          <h2 className="mb-6">Fungsi Utama Taman Kehati</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <h4 className="mb-2">Konservasi Ex-situ</h4>
                <p className="text-sm text-muted-foreground">
                  Pelestarian spesies tumbuhan di luar habitat aslinya untuk mencegah kepunahan
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <h4 className="mb-2">Penelitian</h4>
                <p className="text-sm text-muted-foreground">
                  Pengembangan ilmu pengetahuan botani, ekologi, dan konservasi
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="mb-2">Edukasi</h4>
                <p className="text-sm text-muted-foreground">
                  Penyediaan sarana pembelajaran dan peningkatan kesadaran lingkungan
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <h4 className="mb-2">Rekreasi</h4>
                <p className="text-sm text-muted-foreground">
                  Wisata alam yang edukatif dan mendukung ekonomi berkelanjutan
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-8 mb-8">
          <h2 className="mb-6">Pencapaian Taman Kehati Indonesia</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">12</div>
              <div className="text-sm text-muted-foreground">Taman Kehati Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">3,847</div>
              <div className="text-sm text-muted-foreground">Koleksi Tanaman</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">8,650</div>
              <div className="text-sm text-muted-foreground">Hektar Area</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">127</div>
              <div className="text-sm text-muted-foreground">Spesies Langka</div>
            </div>
          </div>
        </Card>

        {/* Platform Features */}
        <Card className="p-8 mb-8">
          <h2 className="mb-4">Tentang Platform Digital</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Platform digital Taman Kehati Indonesia dikembangkan menggunakan prinsip <strong>ecological informatics</strong>, 
            di mana data spasial (GeoJSON) dan deskriptif (botanical taxonomy) dihubungkan melalui sistem navigasi semantik 
            yang mirip dengan arsitektur knowledge graph.
          </p>
          
          <h3 className="mb-3">Fitur Utama Platform:</h3>
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Badge variant="secondary">GIS</Badge>
              <div>
                <h4 className="text-sm mb-1">Peta Interaktif</h4>
                <p className="text-sm text-muted-foreground">
                  Visualisasi spasial taman dan persebaran koleksi tanaman
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Badge variant="secondary">Database</Badge>
              <div>
                <h4 className="text-sm mb-1">Katalog Digital</h4>
                <p className="text-sm text-muted-foreground">
                  Database terpadu informasi taman dan koleksi tanaman
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Badge variant="secondary">Open Data</Badge>
              <div>
                <h4 className="text-sm mb-1">Data Terbuka</h4>
                <p className="text-sm text-muted-foreground">
                  Akses dataset publik untuk penelitian dan analisis
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Badge variant="secondary">AI</Badge>
              <div>
                <h4 className="text-sm mb-1">AI Assistant</h4>
                <p className="text-sm text-muted-foreground">
                  Pencarian cerdas menggunakan teknologi RAG (Retrieval-Augmented Generation)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 text-center hover:shadow-md transition-shadow">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="mb-2">Tim & Kolaborator</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Kenali tim pengembang dan mitra kolaborasi
            </p>
            <Button 
              variant="outline" 
              onClick={() => onNavigate('tim')}
              className="w-full"
            >
              Lihat Tim
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-md transition-shadow">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="mb-2">Regulasi</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Dasar hukum dan kebijakan konservasi
            </p>
            <Button 
              variant="outline" 
              onClick={() => onNavigate('regulasi')}
              className="w-full"
            >
              Lihat Regulasi
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-md transition-shadow">
            <ExternalLink className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="mb-2">Hubungi Kami</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Kontak dan informasi lebih lanjut
            </p>
            <Button 
              variant="outline" 
              onClick={() => onNavigate('kontak')}
              className="w-full"
            >
              Kontak
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
