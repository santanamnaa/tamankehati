export interface Publication {
  id: string;
  title: string;
  abstract: string;
  type: 'laporan_tahunan' | 'penelitian' | 'dokumentasi' | 'jurnal';
  year: number;
  parkId?: string;
  parkName?: string;
  authors: string[];
  fileUrl?: string;
  publishedDate: string;
  tags: string[];
}

export const mockPublications: Publication[] = [
  {
    id: 'pub-1',
    title: 'Laporan Tahunan Taman Kehati Cibodas 2024',
    abstract: 'Laporan komprehensif mengenai kegiatan konservasi, penelitian, dan edukasi yang dilakukan di Taman Kehati Cibodas sepanjang tahun 2024. Termasuk data koleksi tanaman baru, program pemulihan ekosistem, dan kerjasama penelitian.',
    type: 'laporan_tahunan',
    year: 2024,
    parkId: 'taman-cibodas',
    parkName: 'Taman Kehati Cibodas',
    authors: ['Dr. Siti Nurjanah', 'Prof. Bambang Widianto', 'Rina Kusuma, M.Si'],
    fileUrl: '/documents/laporan-cibodas-2024.pdf',
    publishedDate: '2024-12-15',
    tags: ['konservasi', 'ekosistem', 'biodiversitas']
  },
  {
    id: 'pub-2',
    title: 'Studi Keanekaragaman Hayati Taman Kehati Purwodadi',
    abstract: 'Penelitian mendalam tentang keanekaragaman flora dan fauna di kawasan Taman Kehati Purwodadi. Dokumentasi 127 spesies tanaman endemik dan analisis kondisi habitat alami.',
    type: 'penelitian',
    year: 2024,
    parkId: 'taman-purwodadi',
    parkName: 'Taman Kehati Purwodadi',
    authors: ['Dr. Ahmad Hidayat', 'Dr. Wulan Sari'],
    fileUrl: '/documents/penelitian-purwodadi-2024.pdf',
    publishedDate: '2024-09-20',
    tags: ['biodiversitas', 'flora', 'endemik', 'habitat']
  },
  {
    id: 'pub-3',
    title: 'Konservasi Ex-situ Tumbuhan Langka Indonesia',
    abstract: 'Dokumentasi strategi dan implementasi konservasi ex-situ untuk berbagai spesies tumbuhan langka Indonesia yang terancam punah. Mencakup protokol pembudidayaan dan rehabilitasi.',
    type: 'dokumentasi',
    year: 2023,
    authors: ['Prof. Sutopo Hadi', 'Dr. Eka Permanasari', 'Linda Wijaya, M.Sc'],
    fileUrl: '/documents/konservasi-exsitu-2023.pdf',
    publishedDate: '2023-11-10',
    tags: ['konservasi', 'ex-situ', 'spesies langka', 'rehabilitasi']
  },
  {
    id: 'pub-4',
    title: 'Peran Taman Kehati dalam Mitigasi Perubahan Iklim',
    abstract: 'Analisis kontribusi taman-taman kehati di Indonesia terhadap mitigasi perubahan iklim melalui sekuestrasi karbon, pelestarian ekosistem, dan edukasi lingkungan.',
    type: 'jurnal',
    year: 2024,
    authors: ['Dr. Hendra Gunawan', 'Prof. Maria Suharto'],
    fileUrl: '/documents/mitigasi-iklim-2024.pdf',
    publishedDate: '2024-06-05',
    tags: ['perubahan iklim', 'mitigasi', 'karbon', 'ekosistem']
  },
  {
    id: 'pub-5',
    title: 'Inventarisasi Tanaman Obat Tradisional Nusantara',
    abstract: 'Katalog lengkap tanaman obat tradisional yang dikoleksi di berbagai Taman Kehati Indonesia, termasuk nama lokal, khasiat, dan potensi pengembangan.',
    type: 'penelitian',
    year: 2023,
    parkId: 'taman-bogor',
    parkName: 'Taman Kehati Bogor',
    authors: ['Dr. Dewi Fortuna', 'Agus Salim, M.Si', 'Rini Handayani, S.Si'],
    fileUrl: '/documents/tanaman-obat-2023.pdf',
    publishedDate: '2023-08-22',
    tags: ['tanaman obat', 'tradisional', 'katalog', 'nusantara']
  },
  {
    id: 'pub-6',
    title: 'Laporan Tahunan Taman Kehati Bogor 2023',
    abstract: 'Dokumentasi komprehensif aktivitas Taman Kehati Bogor tahun 2023, meliputi penambahan koleksi, program edukasi, penelitian kolaboratif, dan kunjungan publik.',
    type: 'laporan_tahunan',
    year: 2023,
    parkId: 'taman-bogor',
    parkName: 'Taman Kehati Bogor',
    authors: ['Dr. Joko Ridwan', 'Sari Dewi, M.Si'],
    fileUrl: '/documents/laporan-bogor-2023.pdf',
    publishedDate: '2023-12-20',
    tags: ['laporan tahunan', 'edukasi', 'koleksi']
  },
  {
    id: 'pub-7',
    title: 'Protokol Restorasi Ekosistem Hutan Tropis',
    abstract: 'Panduan teknis restorasi ekosistem hutan tropis berbasis kearifan lokal dan sains modern. Dilengkapi dengan studi kasus dari berbagai taman kehati.',
    type: 'dokumentasi',
    year: 2024,
    authors: ['Prof. Bambang Widianto', 'Dr. Yuni Kusuma', 'Adi Prasetyo, M.For'],
    fileUrl: '/documents/protokol-restorasi-2024.pdf',
    publishedDate: '2024-03-15',
    tags: ['restorasi', 'ekosistem', 'hutan tropis', 'protokol']
  },
  {
    id: 'pub-8',
    title: 'Keanekaragaman Anggrek Indonesia di Taman Kehati',
    abstract: 'Inventarisasi dan dokumentasi koleksi anggrek Indonesia yang tersebar di berbagai Taman Kehati, mencakup 89 spesies dengan foto dan deskripsi morfologi lengkap.',
    type: 'penelitian',
    year: 2024,
    authors: ['Dr. Wulan Anggrek', 'Fitri Orchidea, M.Si'],
    fileUrl: '/documents/anggrek-indonesia-2024.pdf',
    publishedDate: '2024-07-18',
    tags: ['anggrek', 'keanekaragaman', 'flora', 'inventarisasi']
  }
];

export const mockDatasets = [
  {
    id: 'dataset-1',
    name: 'Data Koleksi Tanaman Semua Taman Kehati',
    description: 'Dataset lengkap seluruh koleksi tanaman di Taman Kehati Indonesia',
    format: 'CSV, JSON',
    size: '2.3 MB',
    lastUpdated: '2024-12-01',
    downloadUrl: '/api/datasets/koleksi-tanaman.csv'
  },
  {
    id: 'dataset-2',
    name: 'Data Spasial Taman Kehati',
    description: 'GeoJSON polygon dan koordinat semua taman kehati',
    format: 'GeoJSON',
    size: '456 KB',
    lastUpdated: '2024-11-15',
    downloadUrl: '/api/datasets/spatial-taman.geojson'
  },
  {
    id: 'dataset-3',
    name: 'Status Konservasi IUCN Tanaman',
    description: 'Data status konservasi IUCN untuk semua spesies di koleksi',
    format: 'CSV, JSON',
    size: '1.1 MB',
    lastUpdated: '2024-10-20',
    downloadUrl: '/api/datasets/status-iucn.csv'
  }
];
