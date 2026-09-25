/// Static Markdown documentation for the KAREEMA backend public API.
/// The document is authored from the current backend source and reads no state.
mixin () {
  /// Returns the backend API documentation as Markdown.
  public query func getApiDoc() : async Text {
    "# KAREEMA Backend API\n" #
    "\n" #
    "Backend katalog tenun KAREEMA. Menyediakan katalog produk tenun (baca publik) dan\n" #
    "penyimpanan pesan kontak (hanya controller).\n" #
    "\n" #
    "## Metode Publik\n" #
    "\n" #
    "### `listProducts(filter : ProductFilter) : async [Product]` (query)\n" #
    "\n" #
    "Mengembalikan seluruh produk yang cocok dengan filter, lalu diurutkan.\n" #
    "\n" #
    "- `filter.category : ?Text` — bila diisi, hanya produk dengan `category` **sama persis**\n" #
    "  (case-sensitive) yang dikembalikan. Bila `null`, semua kategori disertakan.\n" #
    "- `filter.search : ?Text` — pencarian **case-insensitive** pada `name` saja (bukan\n" #
    "  deskripsi atau motif). Substring dicocokkan setelah kedua sisi di-lowercase.\n" #
    "  Bila `null` atau string kosong, tidak ada penyaringan pencarian.\n" #
    "- `filter.sort : ?ProductSort` — `#newest` (default), `#priceLowToHigh`,\n" #
    "  atau `#priceHighToLow`. `#newest` mengurutkan berdasarkan `createdAt` menurun\n" #
    "  (terbaru lebih dulu).\n" #
    "\n" #
    "Filter kategori dan pencarian digabung dengan AND. Hasil selalu berupa array\n" #
    "(kosong bila tidak ada yang cocok), bukan `null`.\n" #
    "\n" #
    "### `getProduct(id : Nat) : async ?Product` (query)\n" #
    "\n" #
    "Mengembalikan produk berdasarkan id numerik, atau `null` bila tidak ada.\n" #
    "\n" #
    "### `getProductBySlug(slug : Text) : async ?Product` (query)\n" #
    "\n" #
    "Mengembalikan produk berdasarkan `slug` (case-sensitive, sama persis), atau `null`.\n" #
    "Bila beberapa produk memiliki slug sama, yang pertama ditemukan dikembalikan.\n" #
    "\n" #
    "### `listCategories() : async [Text]` (query)\n" #
    "\n" #
    "Mengembalikan nama kategori unik yang ada di katalog, diurutkan menaik secara\n" #
    "leksikografis. Kategori dianggap unik berdasarkan teks persisnya.\n" #
    "\n" #
    "### `listFeaturedProducts() : async [Product]` (query)\n" #
    "\n" #
    "Mengembalikan produk dengan `featured = true`, diurutkan berdasarkan `createdAt`\n" #
    "menurun (terbaru lebih dulu).\n" #
    "\n" #
    "### `submitContactMessage(name, email, phone, subject, message : Text) : async ContactMessage` (update)\n" #
    "\n" #
    "Menyimpan pesan kontak dan mengembalikan record yang tersimpan.\n" #
    "\n" #
    "- Validasi: `name`, `email`, dan `message` wajib berisi karakter selain spasi.\n" #
    "  Bila kosong atau hanya spasi, pemanggilan **trap** dengan pesan\n" #
    "  `Nama wajib diisi`, `Email wajib diisi`, atau `Pesan wajib diisi`.\n" #
    "  `phone` dan `subject` boleh kosong.\n" #
    "- `id` diberikan otomatis dari penghitung monotonik yang dimulai dari 0 dan\n" #
    "  bertambah satu setiap pesan tersimpan.\n" #
    "- `createdAt` diisi waktu server saat penyimpanan.\n" #
    "\n" #
    "**Keamanan retry:** pemanggilan ini **tidak idempoten**. Setiap pemanggilan yang\n" #
    "berhasil membuat record baru dengan `id` baru; mengulang panggilan yang sama akan\n" #
    "menyimpan pesan duplikat. Jangan mengulang otomatis tanpa konfirmasi pengguna.\n" #
    "\n" #
    "## Autentikasi dan Otorisasi\n" #
    "\n" #
    "- Semua metode baca (`listProducts`, `getProduct`, `getProductBySlug`,\n" #
    "  `listCategories`, `listFeaturedProducts`, `getApiDoc`) bersifat **publik** dan\n" #
    "  dapat dipanggil oleh pemanggil anonim tanpa login.\n" #
    "- `submitContactMessage` juga dapat dipanggil tanpa login; tidak ada pemeriksaan\n" #
    "  pemanggil pada endpoint ini.\n" #
    "- Data pesan kontak **tidak** diekspos melalui API publik. Tabel `contactMessage`\n" #
    "  hanya dapat dibaca oleh controller canister (mis. agen Data Intelligence),\n" #
    "  bukan oleh pengguna biasa.\n" #
    "\n" #
    "Frontend aplikasi ini memakai derivation origin Internet Identity. Agen yang sudah\n" #
    "memegang otorisasi Internet Identity pengguna menurunkan principal per-aplikasi\n" #
    "terhadap origin tersebut (mis. `icp identity link web <name> --app <host>`).\n" #
    "Delegasi semacam itu bertindak dengan otoritas penuh pengguna di aplikasi ini\n" #
    "sampai kedaluwarsa.\n" #
    "\n" #
    "## Satuan dan Encoding\n" #
    "\n" #
    "- `price` adalah bilangan bulat **Rupiah penuh** (tanpa desimal), mis. `1425000`\n" #
    "  ditampilkan sebagai \"Rp 1.425.000\".\n" #
    "- `createdAt` adalah **milidetik** sejak Unix epoch (bukan nanodetik, bukan detik).\n" #
    "- `id` adalah `Nat` yang dimulai dari 0.\n" #
    "- `images` adalah array URL teks; entri pertama adalah gambar utama.\n" #
    "- `ProductFilter` dan `ProductSort` adalah record/variant Candid; field opsional\n" #
    "  dikirim sebagai `null` bila tidak dipakai.\n" #
    "\n" #
    "## Catatan Integrasi\n" #
    "\n" #
    "- Semua metode baca adalah `query` dan tidak mengubah state.\n" #
    "- `listProducts` mengembalikan array kosong (bukan error) saat tidak ada produk\n" #
    "  yang cocok.\n" #
    "- Pencarian hanya mencakup `name`; untuk mencari motif atau bahan, filter di sisi\n" #
    "  klien setelah mengambil data.\n" #
    "- Filter kategori bersifat case-sensitive, berbeda dari pencarian nama yang\n" #
    "  case-insensitive.\n";
  };
};
