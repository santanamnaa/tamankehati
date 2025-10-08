import { useState } from 'react';
import { FileText, Download, Calendar, Users, Filter, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockPublications, mockDatasets } from '../mocks/publications';

interface NavigateFunction {
  (page: string, slug?: string): void;
}

interface PublikasiListPageProps {
  onNavigate: NavigateFunction;
}

const typeLabels: Record<string, string> = {
  laporan_tahunan: 'Laporan Tahunan',
  penelitian: 'Penelitian',
  dokumentasi: 'Dokumentasi',
  jurnal: 'Jurnal'
};

const typeColors: Record<string, string> = {
  laporan_tahunan: 'bg-primary text-primary-foreground',
  penelitian: 'bg-chart-1 text-white',
  dokumentasi: 'bg-secondary text-secondary-foreground',
  jurnal: 'bg-chart-2 text-primary'
};

export function PublikasiListPage({ onNavigate }: PublikasiListPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const years = Array.from(new Set(mockPublications.map(p => p.year))).sort((a, b) => b - a);

  const filteredPublications = mockPublications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || pub.type === selectedType;
    const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
    return matchesSearch && matchesType && matchesYear;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-2">Publikasi & Data</h1>
          <p className="text-primary-foreground/90">
            Akses publikasi ilmiah, laporan tahunan, dan dataset terbuka Taman Kehati Indonesia
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Cari publikasi, penulis, atau topik..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Semua Jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenis</SelectItem>
                <SelectItem value="laporan_tahunan">Laporan Tahunan</SelectItem>
                <SelectItem value="penelitian">Penelitian</SelectItem>
                <SelectItem value="dokumentasi">Dokumentasi</SelectItem>
                <SelectItem value="jurnal">Jurnal</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Semua Tahun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tahun</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Menampilkan {filteredPublications.length} dari {mockPublications.length} publikasi</span>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Publications List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredPublications.length === 0 ? (
              <Card className="p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="mb-2">Tidak ada publikasi ditemukan</h3>
                <p className="text-muted-foreground">
                  Coba ubah filter atau kata kunci pencarian Anda
                </p>
              </Card>
            ) : (
              filteredPublications.map(pub => (
                <Card key={pub.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={typeColors[pub.type]}>
                          {typeLabels[pub.type]}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{pub.year}</span>
                      </div>
                      <h3 
                        className="mb-2 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => onNavigate('publikasi-detail', pub.id)}
                      >
                        {pub.title}
                      </h3>
                      {pub.parkName && (
                        <p className="text-sm text-muted-foreground mb-2">
                          📍 {pub.parkName}
                        </p>
                      )}
                    </div>
                    <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {pub.abstract}
                  </p>

                  <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="line-clamp-1">{pub.authors.join(', ')}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {pub.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(pub.publishedDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate('publikasi-detail', pub.id)}
                      >
                        Detail
                      </Button>
                      {pub.fileUrl && (
                        <Button size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Unduh
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Dataset Section */}
            <Card className="p-6">
              <h3 className="mb-4">Dataset Terbuka</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Akses data terbuka untuk penelitian dan analisis
              </p>
              <div className="space-y-3">
                {mockDatasets.map(dataset => (
                  <div key={dataset.id} className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="text-sm mb-1">{dataset.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {dataset.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{dataset.format}</span>
                      <Button size="sm" variant="ghost" className="h-6 px-2">
                        <Download className="w-3 h-3 mr-1" />
                        Unduh
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Statistics */}
            <Card className="p-6">
              <h3 className="mb-4">Statistik Publikasi</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Publikasi</span>
                  <span className="font-medium">{mockPublications.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Laporan Tahunan</span>
                  <span className="font-medium">
                    {mockPublications.filter(p => p.type === 'laporan_tahunan').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Penelitian</span>
                  <span className="font-medium">
                    {mockPublications.filter(p => p.type === 'penelitian').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Jurnal</span>
                  <span className="font-medium">
                    {mockPublications.filter(p => p.type === 'jurnal').length}
                  </span>
                </div>
              </div>
            </Card>

            {/* Recent Tags */}
            <Card className="p-6">
              <h3 className="mb-4">Tag Populer</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(mockPublications.flatMap(p => p.tags))).map(tag => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
