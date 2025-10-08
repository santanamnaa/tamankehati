export interface GalleryItem {
  id: string;
  tamanKehatiId: number;
  title: string;
  description: string;
  type: 'kegiatan' | 'flora' | 'fauna' | 'infrastruktur' | 'event';
  imageUrl: string;
  capturedDate: string;
  photographer?: string;
  tags: string[];
}

export const MOCK_GALLERIES: GalleryItem[] = [
  {
    id: 'gal-1',
    tamanKehatiId: 1,
    title: 'Kegiatan Edukasi Siswa SD',
    description: 'Kegiatan edukasi lingkungan untuk siswa SD Negeri 01 Jakarta Timur. Siswa belajar tentang pentingnya konservasi keanekaragaman hayati.',
    type: 'kegiatan',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
    capturedDate: '2024-05-15',
    photographer: 'Tim Dokumentasi TK Cibubur',
    tags: ['edukasi', 'siswa', 'konservasi']
  },
  {
    id: 'gal-2',
    tamanKehatiId: 1,
    title: 'Koleksi Cengkeh Berbunga',
    description: 'Pohon cengkeh (Syzygium aromaticum) dalam masa berbunga penuh. Bunga berwarna merah muda terlihat indah.',
    type: 'flora',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc',
    capturedDate: '2024-03-20',
    photographer: 'Dr. Budi Santoso',
    tags: ['cengkeh', 'flora', 'berbunga']
  },
  {
    id: 'gal-3',
    tamanKehatiId: 1,
    title: 'Greenhouse Zona A',
    description: 'Fasilitas greenhouse modern untuk konservasi tanaman yang memerlukan kondisi khusus.',
    type: 'infrastruktur',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
    capturedDate: '2024-02-10',
    tags: ['greenhouse', 'infrastruktur', 'fasilitas']
  },
  {
    id: 'gal-4',
    tamanKehatiId: 2,
    title: 'Kantong Semar di Greenhouse B',
    description: 'Koleksi Nepenthes rafflesiana dalam kondisi prima dengan kantong yang berkembang sempurna.',
    type: 'flora',
    imageUrl: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f',
    capturedDate: '2024-04-12',
    photographer: 'Prof. Dr. Ir. Siti Rahayu',
    tags: ['nepenthes', 'kantong semar', 'karnivora']
  },
  {
    id: 'gal-5',
    tamanKehatiId: 2,
    title: 'Workshop Penelitian Mahasiswa',
    description: 'Workshop metodologi penelitian biodiversitas untuk mahasiswa Biologi UI.',
    type: 'kegiatan',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
    capturedDate: '2024-03-08',
    photographer: 'Humas UI',
    tags: ['workshop', 'mahasiswa', 'penelitian']
  },
  {
    id: 'gal-6',
    tamanKehatiId: 3,
    title: 'Ekosistem Mangrove',
    description: 'Kawasan mangrove yang telah direstorasi dengan baik, menjadi habitat bagi berbagai fauna pesisir.',
    type: 'flora',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
    capturedDate: '2024-01-30',
    photographer: 'Dra. Ani Widiastuti',
    tags: ['mangrove', 'restorasi', 'pesisir']
  },
  {
    id: 'gal-7',
    tamanKehatiId: 3,
    title: 'Penanaman Pohon Bakau',
    description: 'Kegiatan penanaman pohon bakau bersama masyarakat lokal dan relawan lingkungan.',
    type: 'kegiatan',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
    capturedDate: '2024-02-20',
    tags: ['penanaman', 'bakau', 'relawan']
  },
  {
    id: 'gal-8',
    tamanKehatiId: 4,
    title: 'Kebun Tanaman Obat Tradisional',
    description: 'Area khusus untuk koleksi tanaman obat tradisional Sunda seperti kunyit, jahe, dan lengkuas.',
    type: 'flora',
    imageUrl: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5',
    capturedDate: '2024-03-01',
    photographer: 'Bapak Asep Suryadi',
    tags: ['tanaman obat', 'tradisional', 'sunda']
  },
  {
    id: 'gal-9',
    tamanKehatiId: 4,
    title: 'Festival Jamu Tradisional',
    description: 'Festival tahunan yang menampilkan berbagai olahan jamu dari tanaman obat koleksi taman.',
    type: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71',
    capturedDate: '2024-04-22',
    tags: ['festival', 'jamu', 'tradisional']
  },
  {
    id: 'gal-10',
    tamanKehatiId: 5,
    title: 'Bunga Bangkai Mekar',
    description: 'Momen langka bunga bangkai (Amorphophallus titanium) mekar sempurna.',
    type: 'flora',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946',
    capturedDate: '2022-08-15',
    photographer: 'Dr. Hendra Gunawan',
    tags: ['bunga bangkai', 'langka', 'mekar']
  },
  {
    id: 'gal-11',
    tamanKehatiId: 5,
    title: 'Area Konservasi Cendana',
    description: 'Zona khusus untuk konservasi ex-situ pohon cendana yang dilindungi.',
    type: 'flora',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
    capturedDate: '2024-03-25',
    tags: ['cendana', 'konservasi', 'dilindungi']
  },
  {
    id: 'gal-12',
    tamanKehatiId: 6,
    title: 'Koleksi Pisang Pusaka',
    description: 'Berbagai varietas pisang pusaka Jawa yang hampir punah.',
    type: 'flora',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    capturedDate: '2024-02-28',
    photographer: 'Ibu Endang Susilowati',
    tags: ['pisang', 'pusaka', 'jawa']
  },
  {
    id: 'gal-13',
    tamanKehatiId: 6,
    title: 'Upacara Adat Penanaman',
    description: 'Upacara adat Jawa dalam ritual penanaman pohon pusaka.',
    type: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    capturedDate: '2024-03-15',
    tags: ['upacara', 'adat', 'penanaman']
  },
  {
    id: 'gal-14',
    tamanKehatiId: 8,
    title: 'Kamboja Bali dalam Upacara',
    description: 'Bunga kamboja (Plumeria rubra) yang menjadi bagian penting upacara adat Bali.',
    type: 'flora',
    imageUrl: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11',
    capturedDate: '2024-03-12',
    photographer: 'I Made Suteja',
    tags: ['kamboja', 'bali', 'upacara']
  },
  {
    id: 'gal-15',
    tamanKehatiId: 8,
    title: 'Sistem Subak Tradisional',
    description: 'Integrasi sistem subak Bali dengan konservasi biodiversitas modern.',
    type: 'infrastruktur',
    imageUrl: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc',
    capturedDate: '2024-02-05',
    tags: ['subak', 'tradisional', 'bali']
  },
  {
    id: 'gal-16',
    tamanKehatiId: 8,
    title: 'Festival Biodiversitas Bali',
    description: 'Festival tahunan yang menampilkan kekayaan biodiversitas Bali.',
    type: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    capturedDate: '2024-05-01',
    tags: ['festival', 'biodiversitas', 'bali']
  },
];
