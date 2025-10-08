import { ArrowLeft, Download, Calendar, Users, FileText, Tag, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockPublications } from '../mocks/publications';

interface NavigateFunction {
  (page: string, slug?: string): void;
}

interface PublikasiDetailPageProps {
  publicationId: string;
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

export function PublikasiDetailPage({ publicationId, onNavigate }: PublikasiDetailPageProps) {
  const publication = mockPublications.find(p => p.id === publicationId);

  if (!publication) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="mb-2">Publikasi tidak ditemukan</h2>
          <p className="text-muted-foreground mb-4">
            Publikasi yang Anda cari tidak tersedia
          </p>
          <Button onClick={() => onNavigate('publikasi')}>
            Kembali ke Daftar Publikasi
          </Button>
        </Card>
      </div>
    );
  }

  // Related publications
  const relatedPublications = mockPublications
    .filter(p => 
      p.id !== publication.id && 
      (p.type === publication.type || 
       p.parkId === publication.parkId ||
       p.tags.some(tag => publication.tags.includes(tag)))
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => onNavigate('publikasi')}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Publikasi
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <Card className="p-6 md:p-8">
          {/* Publication Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge className={typeColors[publication.type]}>
                {typeLabels[publication.type]}
              </Badge>
              <span className="text-muted-foreground">{publication.year}</span>
            </div>

            <h1 className="mb-4">{publication.title}</h1>

            {publication.parkName && (
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <ExternalLink className="w-4 h-4" />
                <button 
                  onClick={() => onNavigate('taman-detail', publication.parkId)}
                  className="hover:text-primary transition-colors"
                >
                  {publication.parkName}
                </button>
              </div>
            )}

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Tanggal Publikasi</div>
                  <div>
                    {new Date(publication.publishedDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Jumlah Penulis</div>
                  <div>{publication.authors.length} Penulis</div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            {publication.fileUrl && (
              <Button size="lg" className="w-full md:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Unduh Publikasi (PDF)
              </Button>
            )}
          </div>

          {/* Abstract */}
          <div className="mb-8">
            <h2 className="mb-3">Abstrak</h2>
            <p className="text-muted-foreground leading-relaxed">
              {publication.abstract}
            </p>
          </div>

          {/* Authors */}
          <div className="mb-8">
            <h3 className="mb-3">Penulis</h3>
            <div className="space-y-2">
              {publication.authors.map((author, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div>{author}</div>
                    <div className="text-sm text-muted-foreground">Peneliti</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="mb-3">Kata Kunci</h3>
            <div className="flex flex-wrap gap-2">
              {publication.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Citation */}
          <div className="mb-8 p-4 bg-muted/50 rounded-lg border border-border">
            <h3 className="mb-2">Sitasi</h3>
            <p className="text-sm font-mono text-muted-foreground">
              {publication.authors.join(', ')}. ({publication.year}). {publication.title}. 
              {publication.parkName && ` ${publication.parkName}.`} 
              {' '}Taman Kehati Indonesia.
            </p>
            <Button variant="outline" size="sm" className="mt-3">
              Salin Sitasi
            </Button>
          </div>

          {/* Related Publications */}
          {relatedPublications.length > 0 && (
            <div>
              <h3 className="mb-4">Publikasi Terkait</h3>
              <div className="space-y-3">
                {relatedPublications.map(pub => (
                  <Card 
                    key={pub.id}
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onNavigate('publikasi-detail', pub.id)}
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={typeColors[pub.type]} variant="outline">
                            {typeLabels[pub.type]}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{pub.year}</span>
                        </div>
                        <h4 className="text-sm mb-1">{pub.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {pub.abstract}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
