import { TrendingUp, Leaf, MapPin, FileText, Users, AlertCircle, Activity } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockDashboardStats } from '../mocks/statistics';

interface NavigateFunction {
  (page: string, slug?: string): void;
}

interface DashboardPageProps {
  onNavigate: NavigateFunction;
}

const COLORS = ['#4a7c59', '#8fbc8f', '#c5af8f', '#d4a574', '#d4183d'];

const activityTypeIcons: Record<string, any> = {
  koleksi_baru: Leaf,
  publikasi: FileText,
  penelitian: Activity,
  kunjungan: Users
};

const activityTypeColors: Record<string, string> = {
  koleksi_baru: 'bg-chart-1 text-white',
  publikasi: 'bg-chart-2 text-primary',
  penelitian: 'bg-secondary text-secondary-foreground',
  kunjungan: 'bg-primary text-primary-foreground'
};

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const stats = mockDashboardStats;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">Dashboard</h1>
              <p className="text-primary-foreground/90">
                Statistik dan monitoring Taman Kehati Indonesia
              </p>
            </div>
            <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <FileText className="w-4 h-4 mr-2" />
              Ekspor Data
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="secondary">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2
              </Badge>
            </div>
            <div className="text-3xl mb-1">{stats.totalParks}</div>
            <div className="text-sm text-muted-foreground">Total Taman</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-chart-1" />
              </div>
              <Badge variant="secondary">
                <TrendingUp className="w-3 h-3 mr-1" />
                +245
              </Badge>
            </div>
            <div className="text-3xl mb-1">{stats.totalPlants.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Koleksi Tanaman</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-secondary" />
              </div>
              <Badge variant="secondary">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3
              </Badge>
            </div>
            <div className="text-3xl mb-1">{stats.activeResearch}</div>
            <div className="text-sm text-muted-foreground">Penelitian Aktif</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <Badge variant="destructive">Prioritas</Badge>
            </div>
            <div className="text-3xl mb-1">{stats.endangeredSpecies}</div>
            <div className="text-sm text-muted-foreground">Spesies Terancam</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Visitor Trend */}
          <Card className="lg:col-span-2 p-6">
            <h3 className="mb-4">Tren Kunjungan 2024</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.visitors}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(38, 61, 47, 0.1)" />
                <XAxis dataKey="month" stroke="#5a6856" />
                <YAxis stroke="#5a6856" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid rgba(38, 61, 47, 0.15)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#263d2f" 
                  strokeWidth={2}
                  name="Jumlah Pengunjung"
                  dot={{ fill: '#263d2f', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Plants by Status */}
          <Card className="p-6">
            <h3 className="mb-4">Status Konservasi</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.plantsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {stats.plantsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {stats.plantsByStatus.map((item, index) => (
                <div key={item.status} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-muted-foreground">{item.status}</span>
                  </div>
                  <span>{item.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Growth */}
          <Card className="p-6">
            <h3 className="mb-4">Pertumbuhan Bulanan</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(38, 61, 47, 0.1)" />
                <XAxis dataKey="month" stroke="#5a6856" />
                <YAxis stroke="#5a6856" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid rgba(38, 61, 47, 0.15)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="plants" fill="#4a7c59" name="Tanaman Baru" />
                <Bar dataKey="research" fill="#c5af8f" name="Penelitian" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Parks by Province */}
          <Card className="p-6">
            <h3 className="mb-4">Distribusi Taman per Provinsi</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.parksByProvince} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(38, 61, 47, 0.1)" />
                <XAxis type="number" stroke="#5a6856" />
                <YAxis dataKey="province" type="category" width={120} stroke="#5a6856" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid rgba(38, 61, 47, 0.15)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#263d2f" name="Jumlah Taman" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3>Aktivitas Terbaru</h3>
            <Button variant="outline" size="sm">
              Lihat Semua
            </Button>
          </div>
          <div className="space-y-3">
            {stats.recentActivities.map(activity => {
              const Icon = activityTypeIcons[activity.type];
              return (
                <div 
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activityTypeColors[activity.type]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {activity.parkName && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {activity.parkName}
                        </span>
                      )}
                      <span>
                        {new Date(activity.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate('taman')}
          >
            <MapPin className="w-6 h-6 text-primary mb-2" />
            <h4 className="text-sm mb-1">Kelola Taman</h4>
            <p className="text-xs text-muted-foreground">
              Administrasi data taman
            </p>
          </Card>

          <Card 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate('koleksi')}
          >
            <Leaf className="w-6 h-6 text-chart-1 mb-2" />
            <h4 className="text-sm mb-1">Kelola Koleksi</h4>
            <p className="text-xs text-muted-foreground">
              Input koleksi tanaman
            </p>
          </Card>

          <Card 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate('publikasi')}
          >
            <FileText className="w-6 h-6 text-secondary mb-2" />
            <h4 className="text-sm mb-1">Publikasi</h4>
            <p className="text-xs text-muted-foreground">
              Upload dokumen baru
            </p>
          </Card>

          <Card 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate('tim')}
          >
            <Users className="w-6 h-6 text-chart-2 mb-2" />
            <h4 className="text-sm mb-1">Pengguna</h4>
            <p className="text-xs text-muted-foreground">
              Manajemen akses
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
