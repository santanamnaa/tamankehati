export interface DashboardStats {
  totalParks: number;
  totalPlants: number;
  totalArea: number; // in hectares
  conservationZones: number;
  endangeredSpecies: number;
  activeResearch: number;
  visitors: {
    month: string;
    count: number;
  }[];
  plantsByStatus: {
    status: string;
    count: number;
    color: string;
  }[];
  parksByProvince: {
    province: string;
    count: number;
  }[];
  recentActivities: {
    id: string;
    type: 'koleksi_baru' | 'publikasi' | 'penelitian' | 'kunjungan';
    title: string;
    description: string;
    date: string;
    parkName?: string;
  }[];
  monthlyGrowth: {
    month: string;
    plants: number;
    research: number;
  }[];
}

export const mockDashboardStats: DashboardStats = {
  totalParks: 12,
  totalPlants: 3847,
  totalArea: 8650, // hectares
  conservationZones: 34,
  endangeredSpecies: 127,
  activeResearch: 23,
  visitors: [
    { month: 'Jan', count: 1250 },
    { month: 'Feb', count: 1380 },
    { month: 'Mar', count: 1520 },
    { month: 'Apr', count: 1650 },
    { month: 'Mei', count: 1890 },
    { month: 'Jun', count: 2100 },
    { month: 'Jul', count: 2350 },
    { month: 'Agu', count: 2280 },
    { month: 'Sep', count: 2150 },
    { month: 'Okt', count: 2420 },
    { month: 'Nov', count: 2580 },
    { month: 'Des', count: 2750 }
  ],
  plantsByStatus: [
    { status: 'Least Concern', count: 2134, color: '#4a7c59' },
    { status: 'Near Threatened', count: 856, color: '#8fbc8f' },
    { status: 'Vulnerable', count: 423, color: '#c5af8f' },
    { status: 'Endangered', count: 312, color: '#d4a574' },
    { status: 'Critically Endangered', count: 122, color: '#d4183d' }
  ],
  parksByProvince: [
    { province: 'Jawa Barat', count: 4 },
    { province: 'Jawa Timur', count: 3 },
    { province: 'Jawa Tengah', count: 2 },
    { province: 'Bali', count: 1 },
    { province: 'Sumatera Barat', count: 1 },
    { province: 'Kalimantan Timur', count: 1 }
  ],
  recentActivities: [
    {
      id: 'act-1',
      type: 'koleksi_baru',
      title: '15 Spesies Anggrek Baru',
      description: 'Penambahan 15 spesies anggrek endemik Kalimantan ke koleksi Taman Kehati Cibodas',
      date: '2024-12-18',
      parkName: 'Taman Kehati Cibodas'
    },
    {
      id: 'act-2',
      type: 'publikasi',
      title: 'Laporan Tahunan 2024 Dipublikasikan',
      description: 'Laporan komprehensif kegiatan konservasi tahun 2024 telah tersedia untuk umum',
      date: '2024-12-15',
      parkName: 'Taman Kehati Cibodas'
    },
    {
      id: 'act-3',
      type: 'penelitian',
      title: 'Studi Keanekaragaman Hayati Selesai',
      description: 'Penelitian 2 tahun tentang keanekaragaman flora berhasil didokumentasikan',
      date: '2024-12-10',
      parkName: 'Taman Kehati Purwodadi'
    },
    {
      id: 'act-4',
      type: 'kunjungan',
      title: 'Kunjungan Edukasi 250 Siswa',
      description: 'Program edukasi konservasi untuk pelajar SMA dari 5 sekolah di Jakarta',
      date: '2024-12-05',
      parkName: 'Taman Kehati Bogor'
    },
    {
      id: 'act-5',
      type: 'koleksi_baru',
      title: 'Pemulihan Populasi Rafflesia',
      description: 'Berhasil membudidayakan 8 individu Rafflesia arnoldii dari biji',
      date: '2024-11-28',
      parkName: 'Taman Kehati Bengkulu'
    }
  ],
  monthlyGrowth: [
    { month: 'Jan', plants: 142, research: 2 },
    { month: 'Feb', plants: 128, research: 1 },
    { month: 'Mar', plants: 156, research: 3 },
    { month: 'Apr', plants: 189, research: 2 },
    { month: 'Mei', plants: 203, research: 4 },
    { month: 'Jun', plants: 178, research: 2 },
    { month: 'Jul', plants: 224, research: 3 },
    { month: 'Agu', plants: 198, research: 2 },
    { month: 'Sep', plants: 212, research: 1 },
    { month: 'Okt', plants: 245, research: 3 },
    { month: 'Nov', plants: 189, research: 2 },
    { month: 'Des', plants: 156, research: 1 }
  ]
};
