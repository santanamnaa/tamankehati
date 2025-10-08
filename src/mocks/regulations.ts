export interface Regulation {
  id: string;
  title: string;
  type: 'undang_undang' | 'peraturan_pemerintah' | 'peraturan_menteri' | 'keputusan_menteri';
  number: string;
  year: number;
  summary: string;
  issuedBy: string;
  issuedDate: string;
  status: 'aktif' | 'dicabut' | 'direvisi';
  documentUrl?: string;
  relatedRegulations?: string[];
}

export const mockRegulations: Regulation[] = [
  {
    id: 'reg-1',
    title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya',
    type: 'undang_undang',
    number: 'UU No. 5 Tahun 1990',
    year: 1990,
    summary: 'Undang-undang yang mengatur tentang konservasi sumber daya alam hayati dan ekosistemnya, termasuk perlindungan sistem penyangga kehidupan, pengawetan keanekaragaman jenis tumbuhan dan satwa beserta ekosistemnya.',
    issuedBy: 'Pemerintah Republik Indonesia',
    issuedDate: '1990-08-10',
    status: 'aktif',
    documentUrl: '/documents/uu-5-1990.pdf'
  },
  {
    id: 'reg-2',
    title: 'Taman Nasional, Taman Hutan Raya, dan Taman Wisata Alam',
    type: 'peraturan_pemerintah',
    number: 'PP No. 28 Tahun 2011',
    year: 2011,
    summary: 'Peraturan Pemerintah tentang pengelolaan kawasan suaka alam dan kawasan pelestarian alam, termasuk taman nasional, taman hutan raya, dan taman wisata alam.',
    issuedBy: 'Presiden Republik Indonesia',
    issuedDate: '2011-06-07',
    status: 'aktif',
    documentUrl: '/documents/pp-28-2011.pdf',
    relatedRegulations: ['reg-1']
  },
  {
    id: 'reg-3',
    title: 'Strategi dan Rencana Aksi Keanekaragaman Hayati Indonesia',
    type: 'peraturan_menteri',
    number: 'Permen LH No. 03 Tahun 2012',
    year: 2012,
    summary: 'Peraturan Menteri Lingkungan Hidup tentang Strategi dan Rencana Aksi Keanekaragaman Hayati Indonesia (IBSAP) 2015-2020, sebagai pedoman pelaksanaan konservasi keanekaragaman hayati.',
    issuedBy: 'Menteri Lingkungan Hidup',
    issuedDate: '2012-02-15',
    status: 'aktif',
    documentUrl: '/documents/permen-lh-03-2012.pdf',
    relatedRegulations: ['reg-1', 'reg-2']
  },
  {
    id: 'reg-4',
    title: 'Perlindungan dan Pengelolaan Lingkungan Hidup',
    type: 'undang_undang',
    number: 'UU No. 32 Tahun 2009',
    year: 2009,
    summary: 'Undang-undang yang mengatur tentang perlindungan dan pengelolaan lingkungan hidup, termasuk pelestarian fungsi lingkungan hidup dan pengendalian pencemaran.',
    issuedBy: 'Pemerintah Republik Indonesia',
    issuedDate: '2009-10-03',
    status: 'aktif',
    documentUrl: '/documents/uu-32-2009.pdf'
  },
  {
    id: 'reg-5',
    title: 'Jenis Tumbuhan dan Satwa yang Dilindungi',
    type: 'peraturan_menteri',
    number: 'Permen LHK No. P.106 Tahun 2018',
    year: 2018,
    summary: 'Peraturan Menteri Lingkungan Hidup dan Kehutanan tentang penetapan jenis tumbuhan dan satwa yang dilindungi, mencakup daftar lengkap spesies yang mendapat perlindungan hukum.',
    issuedBy: 'Menteri Lingkungan Hidup dan Kehutanan',
    issuedDate: '2018-12-20',
    status: 'aktif',
    documentUrl: '/documents/permen-lhk-106-2018.pdf',
    relatedRegulations: ['reg-1']
  },
  {
    id: 'reg-6',
    title: 'Pengelolaan Koleksi Tumbuhan dan Satwa Liar',
    type: 'peraturan_menteri',
    number: 'Permen LHK No. P.8 Tahun 2018',
    year: 2018,
    summary: 'Peraturan tentang pengelolaan koleksi tumbuhan dan satwa liar, termasuk tata cara pengumpulan, pemeliharaan, dan pemanfaatan koleksi untuk kepentingan konservasi, penelitian, dan pendidikan.',
    issuedBy: 'Menteri Lingkungan Hidup dan Kehutanan',
    issuedDate: '2018-02-06',
    status: 'aktif',
    documentUrl: '/documents/permen-lhk-8-2018.pdf',
    relatedRegulations: ['reg-1', 'reg-5']
  },
  {
    id: 'reg-7',
    title: 'Pembangunan Berkelanjutan',
    type: 'peraturan_pemerintah',
    number: 'PP No. 46 Tahun 2017',
    year: 2017,
    summary: 'Peraturan Pemerintah tentang instrumen ekonomi lingkungan hidup dalam mendukung pembangunan berkelanjutan dan konservasi keanekaragaman hayati.',
    issuedBy: 'Presiden Republik Indonesia',
    issuedDate: '2017-09-11',
    status: 'aktif',
    documentUrl: '/documents/pp-46-2017.pdf',
    relatedRegulations: ['reg-4']
  },
  {
    id: 'reg-8',
    title: 'Pemanfaatan Jenis Tumbuhan dan Satwa Liar',
    type: 'keputusan_menteri',
    number: 'Kepmen LHK No. 447 Tahun 2019',
    year: 2019,
    summary: 'Keputusan Menteri tentang pemanfaatan jenis tumbuhan dan satwa liar yang tidak dilindungi untuk kepentingan penelitian, pengembangan ilmu pengetahuan, dan pembangunan.',
    issuedBy: 'Menteri Lingkungan Hidup dan Kehutanan',
    issuedDate: '2019-08-25',
    status: 'aktif',
    documentUrl: '/documents/kepmen-lhk-447-2019.pdf',
    relatedRegulations: ['reg-5', 'reg-6']
  }
];
