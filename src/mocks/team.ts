export interface TeamMember {
  id: string;
  name: string;
  role: string;
  organization: string;
  expertise: string[];
  bio: string;
  email?: string;
  imageUrl?: string;
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Prof. Dr. Bambang Widianto',
    role: 'Ketua Tim Pengembang',
    organization: 'Lembaga Ilmu Pengetahuan Indonesia (LIPI)',
    expertise: ['Ekologi', 'Konservasi Biodiversitas', 'Restorasi Ekosistem'],
    bio: 'Profesor di bidang ekologi dengan pengalaman 25 tahun dalam penelitian keanekaragaman hayati Indonesia. Memimpin berbagai proyek konservasi nasional dan internasional.',
    email: 'bambang.widianto@lipi.go.id',
    imageUrl: '/images/team/bambang.jpg'
  },
  {
    id: 'team-2',
    name: 'Dr. Siti Nurjanah, M.Si',
    role: 'Koordinator Penelitian',
    organization: 'Kebun Raya Bogor - BRIN',
    expertise: ['Taksonomi Tumbuhan', 'Konservasi Ex-situ', 'Botani Sistematis'],
    bio: 'Peneliti senior di Kebun Raya Bogor dengan spesialisasi taksonomi dan konservasi tumbuhan tropis. Telah menerbitkan 40+ publikasi ilmiah internasional.',
    email: 'siti.nurjanah@brin.go.id',
    imageUrl: '/images/team/siti.jpg'
  },
  {
    id: 'team-3',
    name: 'Dr. Ahmad Hidayat',
    role: 'Ahli Sistem Informasi Geografis',
    organization: 'Institut Teknologi Bandung',
    expertise: ['GIS', 'Remote Sensing', 'Ecological Informatics'],
    bio: 'Pakar sistem informasi geografis dengan fokus pada aplikasi teknologi untuk konservasi lingkungan. Mengembangkan sistem pemetaan biodiversitas berbasis web.',
    email: 'ahmad.hidayat@itb.ac.id',
    imageUrl: '/images/team/ahmad.jpg'
  },
  {
    id: 'team-4',
    name: 'Rina Kusuma, M.Sc',
    role: 'Koordinator Database',
    organization: 'Kementerian Lingkungan Hidup dan Kehutanan',
    expertise: ['Database Management', 'Biodiversity Informatics', 'Data Science'],
    bio: 'Spesialis pengelolaan database biodiversitas dengan pengalaman implementasi sistem informasi konservasi di tingkat nasional.',
    email: 'rina.kusuma@menlhk.go.id',
    imageUrl: '/images/team/rina.jpg'
  },
  {
    id: 'team-5',
    name: 'Dr. Wulan Sari',
    role: 'Ahli Konservasi Tumbuhan',
    organization: 'Universitas Indonesia',
    expertise: ['Plant Conservation', 'Ethnobotany', 'Sustainable Use'],
    bio: 'Dosen dan peneliti dengan fokus pada konservasi tumbuhan obat tradisional dan pemanfaatan berkelanjutan sumber daya hayati.',
    email: 'wulan.sari@ui.ac.id',
    imageUrl: '/images/team/wulan.jpg'
  },
  {
    id: 'team-6',
    name: 'Agus Salim, M.For',
    role: 'Koordinator Lapangan',
    organization: 'Balai Konservasi Sumber Daya Alam',
    expertise: ['Field Survey', 'Community Engagement', 'Forest Management'],
    bio: 'Praktisi konservasi dengan pengalaman luas dalam survei lapangan dan pemberdayaan masyarakat di sekitar kawasan konservasi.',
    email: 'agus.salim@bksda.go.id',
    imageUrl: '/images/team/agus.jpg'
  }
];

export interface Collaborator {
  id: string;
  name: string;
  type: 'pemerintah' | 'universitas' | 'lsm' | 'internasional';
  logoUrl?: string;
  website?: string;
  description: string;
}

export const mockCollaborators: Collaborator[] = [
  {
    id: 'col-1',
    name: 'Kementerian Lingkungan Hidup dan Kehutanan',
    type: 'pemerintah',
    website: 'https://www.menlhk.go.id',
    description: 'Kementerian yang membawahi kebijakan konservasi dan pengelolaan keanekaragaman hayati Indonesia'
  },
  {
    id: 'col-2',
    name: 'Badan Riset dan Inovasi Nasional (BRIN)',
    type: 'pemerintah',
    website: 'https://www.brin.go.id',
    description: 'Lembaga penelitian nasional yang mengelola kebun raya dan pusat konservasi ex-situ'
  },
  {
    id: 'col-3',
    name: 'Universitas Indonesia',
    type: 'universitas',
    website: 'https://www.ui.ac.id',
    description: 'Mitra akademik dalam penelitian biodiversitas dan pengembangan sumber daya manusia'
  },
  {
    id: 'col-4',
    name: 'Institut Teknologi Bandung',
    type: 'universitas',
    website: 'https://www.itb.ac.id',
    description: 'Kolaborator dalam pengembangan teknologi sistem informasi geografis dan remote sensing'
  },
  {
    id: 'col-5',
    name: 'WWF Indonesia',
    type: 'lsm',
    website: 'https://www.wwf.id',
    description: 'Organisasi konservasi global yang mendukung pelestarian keanekaragaman hayati Indonesia'
  },
  {
    id: 'col-6',
    name: 'The Nature Conservancy Indonesia',
    type: 'lsm',
    website: 'https://www.nature.org/indonesia',
    description: 'LSM internasional yang bekerja dalam konservasi ekosistem dan pembangunan berkelanjutan'
  },
  {
    id: 'col-7',
    name: 'International Union for Conservation of Nature (IUCN)',
    type: 'internasional',
    website: 'https://www.iucn.org',
    description: 'Organisasi internasional yang menetapkan standar status konservasi spesies global'
  },
  {
    id: 'col-8',
    name: 'Botanic Gardens Conservation International (BGCI)',
    type: 'internasional',
    website: 'https://www.bgci.org',
    description: 'Jaringan global kebun raya yang mendukung konservasi tumbuhan ex-situ'
  }
];
