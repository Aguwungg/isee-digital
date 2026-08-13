const dummyArticles = [
    {
        id: 1,
        title: "5 Strategi SEO Terbaik Tahun 2024 Untuk Meningkatkan Traffic",
        category: "Digital Marketing",
        date: "12 Agu 2026",
        author: "Naillah Insyira Leurima",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
        excerpt: "Pelajari strategi SEO paling mutakhir yang terbukti ampuh mendongkrak trafik organik ke website Anda.",
        content: "Search Engine Optimization (SEO) terus berkembang setiap tahunnya. Di tahun 2024 ini, algoritma Google semakin pintar dalam memahami niat pengguna (user intent). Strategi terbaik tahun ini berfokus pada pembuatan konten berkualitas tinggi yang memberikan jawaban langsung dan relevan, optimasi Core Web Vitals untuk pengalaman pengguna yang lebih cepat, serta membangun backlink secara organik melalui publikasi yang kredibel. Menerapkan strategi ini bukan hanya soal mendapatkan peringkat pertama, tetapi mempertahankan posisi tersebut dalam jangka waktu panjang."
    },
    {
        id: 2,
        title: "Panduan Lengkap Memaksimalkan ROI pada Facebook Ads",
        category: "Iklan Online",
        date: "05 Agu 2026",
        author: "Naillah Insyira Leurima",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
        excerpt: "Bagaimana cara mengatur budget dan audiens di Facebook Ads agar menghasilkan Return on Investment maksimal.",
        content: "Banyak pengiklan pemula menghabiskan jutaan rupiah di Facebook Ads tanpa hasil yang jelas. Kunci utama memaksimalkan Return on Investment (ROI) adalah penargetan audiens yang hiper-spesifik dan penggunaan A/B testing untuk setiap elemen iklan (gambar, copywriting, dan call-to-action). Selain itu, memanfaatkan Facebook Pixel untuk melakukan retargeting kepada pengunjung website yang belum melakukan konversi adalah salah satu cara paling efektif untuk menurunkan biaya akuisisi pelanggan."
    },
    {
        id: 3,
        title: "Mengapa Data-Driven Marketing Adalah Kunci Kesuksesan Bisnis",
        category: "Digital Marketing",
        date: "02 Agu 2026",
        author: "Naillah Insyira Leurima",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        excerpt: "Tinggalkan asumsi. Saatnya menggunakan data untuk mengambil keputusan marketing yang lebih presisi.",
        content: "Di era digital, setiap interaksi pengguna meninggalkan jejak data. Data-driven marketing memungkinkan pemasar untuk beralih dari tebak-tebakan menjadi keputusan berbasis fakta. Dengan menganalisis data seperti tingkat konversi, bounce rate, dan customer lifetime value (CLV), perusahaan dapat menyesuaikan pesan pemasaran mereka secara personal untuk setiap segmen audiens. Hasilnya adalah kampanye yang lebih efisien, pengeluaran yang lebih hemat, dan loyalitas pelanggan yang meningkat secara signifikan."
    },
    {
        id: 4,
        title: "Pentingnya Copywriting yang Persuasif dalam Landing Page",
        category: "Konten",
        date: "28 Jul 2026",
        author: "Naillah Insyira Leurima",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=800&q=80",
        excerpt: "Kata-kata memiliki kekuatan untuk menjual. Pelajari rumus copywriting yang mengkonversi pengunjung menjadi pembeli.",
        content: "Desain landing page yang indah tidak akan menghasilkan penjualan tanpa didukung oleh copywriting yang kuat. Copywriting persuasif berfokus pada masalah (pain points) yang dialami audiens dan menyajikan produk atau layanan sebagai solusi mutlak. Rumus seperti AIDA (Attention, Interest, Desire, Action) atau PAS (Problem, Agitate, Solve) sangat efektif digunakan. Judul yang memikat, deskripsi manfaat yang jelas (bukan sekadar fitur), dan ajakan bertindak (CTA) yang mendesak adalah elemen tak terpisahkan dari landing page yang sukses."
    },
    {
        id: 5,
        title: "Trend Media Sosial yang Wajib Diikuti Brand Anda Tahun Ini",
        category: "Media Sosial",
        date: "20 Jul 2026",
        author: "Naillah Insyira Leurima",
        image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=800&q=80",
        excerpt: "Dari short-form video hingga social commerce, inilah tren media sosial yang sedang naik daun.",
        content: "Lanskap media sosial berubah sangat cepat. Tahun ini, format video pendek (short-form video) seperti TikTok, Instagram Reels, dan YouTube Shorts masih mendominasi perhatian audiens. Selain itu, pergeseran menuju 'Social Commerce'—di mana pengguna dapat berbelanja langsung di dalam aplikasi media sosial tanpa harus pindah ke website—menjadi semakin populer. Brand yang otentik, transparan, dan aktif berinteraksi dengan komunitasnya melalui fitur siaran langsung (live streaming) akan memenangkan hati konsumen."
    },
    {
        id: 6,
        title: "Tips Mengoptimalkan Google Ads Untuk UKM",
        category: "Iklan Online",
        date: "15 Jul 2026",
        author: "Naillah Insyira Leurima",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
        excerpt: "Usaha kecil menengah bisa bersaing dengan brand besar di Google Ads jika menerapkan strategi ini.",
        content: "Banyak Usaha Kecil Menengah (UKM) merasa takut beriklan di Google Ads karena anggapan biayanya yang mahal. Padahal, dengan strategi yang tepat, UKM dapat bersaing efektif. Fokuslah pada 'long-tail keywords'—kata kunci yang lebih panjang dan spesifik, yang biasanya memiliki tingkat kompetisi dan biaya per klik (CPC) yang lebih rendah. Selain itu, optimalkan fitur ekstensi iklan untuk memberikan informasi lebih (seperti lokasi dan nomor telepon) serta pastikan landing page Anda relevan dengan iklan yang ditayangkan agar Quality Score tetap tinggi."
    },
    {
        id: 7,
        title: "Pemanfaatan AI dalam Content Marketing",
        category: "Konten",
        date: "10 Jul 2026",
        author: "Naillah Insyira Leurima",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
        excerpt: "Bagaimana Kecerdasan Buatan membantu marketer membuat konten lebih cepat dan relevan.",
        content: "Kecerdasan Buatan (AI) telah merevolusi cara marketer membuat dan mendistribusikan konten. Dari alat pembuat teks generasi baru hingga analitik prediktif yang menyarankan topik hangat berikutnya, AI menghemat ribuan jam kerja manual. Namun, sentuhan manusia tetap krusial. AI sebaiknya digunakan sebagai asisten untuk mengatasi 'writer's block' atau mengumpulkan data mentah, sementara editor manusia bertugas memberikan empati, konteks budaya, dan suara merek (brand voice) yang unik ke dalam konten akhir."
    },
    {
        id: 8,
        title: "Cara Membangun Brand Identity yang Kuat di Era Digital",
        category: "Digital Marketing",
        date: "05 Jul 2026",
        author: "Naillah Insyira Leurima",
        image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80",
        excerpt: "Membangun identitas merek lebih dari sekadar logo. Ini tentang nilai dan konsistensi di dunia maya.",
        content: "Di tengah bisingnya persaingan digital, brand identity yang kuat adalah jangkar yang membuat bisnis Anda mudah diingat. Ini melampaui visual (logo, warna, tipografi) dan mencakup nilai-nilai perusahaan, cara berkomunikasi, dan pengalaman pelanggan secara keseluruhan. Konsistensi adalah kunci. Pesan yang disampaikan di website harus selaras dengan postingan di media sosial dan email marketing. Brand yang secara konsisten menunjukkan karakter aslinya akan lebih mudah membangun kepercayaan dan komunitas pelanggan yang loyal."
    },
    {
        id: 9,
        title: "Metrik Penting yang Sering Diabaikan Marketer Pemula",
        category: "Data Analitik",
        date: "01 Jul 2026",
        author: "Naillah Insyira Leurima",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        excerpt: "Jangan hanya fokus pada jumlah likes. Ini metrik yang sebenarnya berdampak pada pendapatan bisnis.",
        content: "Vanity metrics seperti jumlah pengikut (followers) dan likes memang terlihat bagus di atas kertas, tetapi tidak selalu mencerminkan kesehatan bisnis. Marketer pemula sering kali terjebak dalam angka-angka ini dan mengabaikan metrik fundamental yang mendorong pendapatan nyata. Metrik krusial yang wajib dipantau antara lain Cost Per Acquisition (CPA) atau biaya untuk mendapatkan satu pelanggan, Customer Lifetime Value (CLV), dan Conversion Rate. Memahami rasio antara biaya pengeluaran dan nilai jangka panjang pelanggan adalah kunci keberlanjutan bisnis digital."
    }
];
