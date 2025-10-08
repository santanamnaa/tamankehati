import { useState } from 'react';
import { FileText, Download, Calendar, Shield, Search, BookOpen } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockRegulations } from '../mocks/regulations';

interface NavigateFunction {
  (page: string, slug?: string): void;
}

interface RegulasiPageProps {
  onNavigate: NavigateFunction;
}

const typeLabels: Record<string, string> = {
  undang_undang: 'Undang-Undang',
  peraturan_pemerintah: 'Peraturan Pemerintah',
  peraturan_menteri: 'Peraturan Menteri',
  keputusan_menteri: 'Keputusan Menteri'
};

const typeColors: Record<string, string> = {
  undang_undang: 'bg-primary text-primary-foreground',
  peraturan_pemerintah: 'bg-chart-1 text-white',
  peraturan_menteri: 'bg-secondary text-secondary-foreground',
  keputusan_menteri: 'bg-chart-2 text-primary'
};

const statusColors: Record<string, string> = {
  aktif: 'bg-chart-1 text-white',
  dicabut: 'bg-destructive text-destructive-foreground',
  direvisi: 'bg-secondary text-secondary-foreground'
};

export function RegulasiPage({ onNavigate }: RegulasiPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredRegulations = mockRegulations.filter(reg => {
    const matchesSearch = reg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reg.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reg.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || reg.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || reg.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-10 h-10" />
            <h1>Regulasi & Kebijakan</h1>
          </div>
          <p className="text-primary-foreground/90">
            Dasar hukum dan kebijakan konservasi keanekaragaman hayati Indonesia
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Info Card */}
        <Card className="p-6 mb-6 bg-chart-1/5 border-chart-1/20">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-chart-1 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="mb-2">Tentang Regulasi Konservasi</h3>
              <p className="text-sm text-muted-foreground">
                Konservasi keanekaragaman hayati di Indonesia diatur oleh berbagai peraturan perundang-undangan 
                yang mengatur tentang perlindungan, pelestarian, dan pemanfaatan berkelanjutan sumber daya alam hayati. 
                Regulasi ini menjadi dasar hukum bagi pengelolaan Taman Kehati dan upaya konservasi nasional.
              </p>
            </div>
          </div>
        </Card>

        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Cari regulasi..."
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
                <SelectItem value="undang_undang">Undang-Undang</SelectItem>
                <SelectItem value="peraturan_pemerintah">Peraturan Pemerintah</SelectItem>
                <SelectItem value="peraturan_menteri">Peraturan Menteri</SelectItem>
                <SelectItem value="keputusan_menteri">Keputusan Menteri</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="dicabut">Dicabut</SelectItem>
                <SelectItem value="direvisi">Direvisi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground mt-4">
            Menampilkan {filteredRegulations.length} dari {mockRegulations.length} regulasi
          </div>
        </Card>

        {/* Regulations List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredRegulations.length === 0 ? (
            <Card className="p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="mb-2">Tidak ada regulasi ditemukan</h3>
              <p className="text-muted-foreground">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
            </Card>
          ) : (
            filteredRegulations.map(reg => (
              <Card key={reg.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge className={typeColors[reg.type]}>
                        {typeLabels[reg.type]}
                      </Badge>
                      <Badge variant="outline">{reg.number}</Badge>
                      <Badge className={statusColors[reg.status]}>
                        {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                      </Badge>
                    </div>
                    <h3 className="mb-2">{reg.title}</h3>
                  </div>
                  <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {reg.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Diterbitkan oleh: </span>
                    <span>{reg.issuedBy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {new Date(reg.issuedDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {reg.relatedRegulations && reg.relatedRegulations.length > 0 && (
                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground">Terkait dengan: </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {reg.relatedRegulations.map(relId => {
                        const relReg = mockRegulations.find(r => r.id === relId);
                        return relReg ? (
                          <Badge key={relId} variant="outline" className="text-xs">
                            {relReg.number}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {reg.documentUrl && (
                  <div className="pt-4 border-t border-border">
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Unduh Dokumen
                    </Button>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>

        {/* Statistics Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card className="p-4">
            <div className="text-center">
              <div className="text-3xl mb-1">{mockRegulations.length}</div>
              <div className="text-sm text-muted-foreground">Total Regulasi</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-center">
              <div className="text-3xl mb-1">
                {mockRegulations.filter(r => r.type === 'undang_undang').length}
              </div>
              <div className="text-sm text-muted-foreground">Undang-Undang</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-center">
              <div className="text-3xl mb-1">
                {mockRegulations.filter(r => r.type === 'peraturan_pemerintah').length}
              </div>
              <div className="text-sm text-muted-foreground">PP</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-center">
              <div className="text-3xl mb-1">
                {mockRegulations.filter(r => r.status === 'aktif').length}
              </div>
              <div className="text-sm text-muted-foreground">Aktif</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
