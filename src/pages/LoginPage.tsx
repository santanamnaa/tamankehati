import { useState } from 'react';
import { LogIn, Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Alert, AlertDescription } from '../components/ui/alert';

interface NavigateFunction {
  (page: string, slug?: string): void;
}

interface LoginPageProps {
  onNavigate: NavigateFunction;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (email === 'admin@tamankehati.id' && password === 'demo123') {
        // Successful login
        onNavigate('dashboard');
      } else {
        setError('Email atau password tidak valid. Gunakan admin@tamankehati.id / demo123 untuk demo.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="mb-2">Taman Kehati Indonesia</h1>
          <p className="text-muted-foreground">
            Sistem Manajemen Konservasi Biodiversitas
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-8">
          <div className="mb-6">
            <h2 className="mb-2">Masuk ke Sistem</h2>
            <p className="text-sm text-muted-foreground">
              Masukkan kredensial Anda untuk mengakses dashboard
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => setError('Fitur reset password akan segera hadir.')}
                >
                  Lupa password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm cursor-pointer select-none"
              >
                Ingat saya
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Memproses...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Masuk
                </>
              )}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">
              <strong>Demo Credentials:</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Email: admin@tamankehati.id<br />
              Password: demo123
            </p>
          </div>
        </Card>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          <button
            onClick={() => onNavigate('home')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Kembali ke Beranda
          </button>
          <p className="text-xs text-muted-foreground">
            Untuk akses atau pertanyaan, silakan{' '}
            <button
              onClick={() => onNavigate('kontak')}
              className="text-primary hover:underline"
            >
              hubungi administrator
            </button>
          </p>
        </div>

        {/* User Roles Info */}
        <Card className="mt-6 p-6">
          <h3 className="mb-3">Tingkat Akses Pengguna</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div>
                <strong>Administrator:</strong> Akses penuh ke semua fitur dan data
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-chart-1 mt-1.5 flex-shrink-0" />
              <div>
                <strong>Pengelola Taman:</strong> Kelola data taman dan koleksi tanaman
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
              <div>
                <strong>Peneliti:</strong> Akses data dan upload publikasi
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
              <div>
                <strong>Publik:</strong> Akses baca untuk semua informasi terbuka
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
