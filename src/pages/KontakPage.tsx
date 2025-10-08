import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface NavigateFunction {
  (page: string, slug?: string): void;
}

interface KontakPageProps {
  onNavigate: NavigateFunction;
}

export function KontakPage({ onNavigate }: KontakPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-10 h-10" />
            <h1>Hubungi Kami</h1>
          </div>
          <p className="text-primary-foreground/90">
            Kami siap menjawab pertanyaan dan menerima masukan Anda
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 md:p-8">
              {!submitted ? (
                <>
                  <h2 className="mb-6">Kirim Pesan</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Masukkan nama Anda"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="nama@email.com"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subjek</Label>
                      <Select 
                        value={formData.subject} 
                        onValueChange={(value) => handleChange('subject', value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Pilih subjek" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pertanyaan_umum">Pertanyaan Umum</SelectItem>
                          <SelectItem value="kolaborasi">Kolaborasi</SelectItem>
                          <SelectItem value="akses_data">Akses Data</SelectItem>
                          <SelectItem value="kunjungan">Kunjungan Taman</SelectItem>
                          <SelectItem value="penelitian">Penelitian</SelectItem>
                          <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Pesan</Label>
                      <Textarea
                        id="message"
                        placeholder="Tulis pesan Anda di sini..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      <Send className="w-4 h-4 mr-2" />
                      Kirim Pesan
                    </Button>
                  </form>
                </>
              ) : (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-chart-1 mx-auto mb-4" />
                  <h2 className="mb-2">Pesan Terkirim!</h2>
                  <p className="text-muted-foreground">
                    Terima kasih telah menghubungi kami. Kami akan merespons pesan Anda sesegera mungkin.
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="mb-4">Informasi Kontak</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Email</div>
                    <a 
                      href="mailto:info@tamankehati.id" 
                      className="hover:text-primary transition-colors"
                    >
                      info@tamankehati.id
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Telepon</div>
                    <a 
                      href="tel:+62215555000" 
                      className="hover:text-primary transition-colors"
                    >
                      +62 21 5555 000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Alamat</div>
                    <p className="text-sm">
                      Gedung BRIN<br />
                      Jl. Raya Bogor Km. 46<br />
                      Cibinong, Jawa Barat 16911
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-6">
              <h3 className="mb-4">Media Sosial</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ikuti kami untuk update terbaru tentang konservasi dan kegiatan Taman Kehati
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://facebook.com', '_blank')}
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://twitter.com', '_blank')}
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://instagram.com', '_blank')}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </Card>

            {/* Office Hours */}
            <Card className="p-6">
              <h3 className="mb-4">Jam Operasional</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Senin - Jumat</span>
                  <span>08:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sabtu</span>
                  <span>08:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minggu</span>
                  <span className="text-destructive">Tutup</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                *Jam kunjungan taman mungkin berbeda. Silakan hubungi taman terkait untuk informasi lebih lanjut.
              </div>
            </Card>

            {/* FAQ Link */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="mb-2">Pertanyaan Umum?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Cek halaman FAQ kami untuk jawaban cepat atas pertanyaan yang sering diajukan.
              </p>
              <Button variant="outline" className="w-full">
                Lihat FAQ
              </Button>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="mt-6 overflow-hidden">
          <div className="bg-muted/20 h-80 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-chart-2/10 to-chart-1/10" />
            <div className="relative z-10 text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="mb-2">Lokasi Kantor Pusat</h3>
              <p className="text-sm text-muted-foreground">
                Peta interaktif lokasi kantor
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
