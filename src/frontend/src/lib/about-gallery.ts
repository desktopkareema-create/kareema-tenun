import { FALLBACK_PRODUCT_IMAGE } from "@/types";

/** A single captioned photograph in the Tentang Kami gallery. */
export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
}

/** A titled group of photographs, rendered as its own responsive grid. */
export interface GallerySection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  photos: GalleryPhoto[];
}

/**
 * Tentang Kami photo gallery. Uses the workshop/hero photography already
 * shipped with the app plus product shots as production documentation.
 */
export const ABOUT_GALLERY_SECTIONS: GallerySection[] = [
  {
    id: "lokasi",
    eyebrow: "Lokasi & Workshop",
    title: "Rumah Tenun di Troso",
    description:
      "Di sinilah semuanya dimulai — deretan rumah produksi di Troso, Jepara, tempat alat tenun kayu berdiri berdampingan dengan kehidupan sehari-hari para pengrajin.",
    photos: [
      {
        src: "/assets/generated/about-weaving-hero.dim_1600x1000.jpg",
        alt: "Pengrajin menenun kain di atas alat tenun bukan mesin di Troso, Jepara",
        caption:
          "Ruang tenun utama di Troso, tempat alat tenun bukan mesin (ATBM) kayu dipakai setiap hari.",
      },
      {
        src: "/assets/generated/hero-tenun-jepara.dim_1920x1080.jpg",
        alt: "Deretan alat tenun kayu di workshop tenun Troso, Jepara",
        caption:
          "Deretan ATBM kayu di workshop — setiap alat dipakai oleh satu pengrajin untuk satu lembar kain.",
      },
      {
        src: "/assets/generated/products/kain-sicengkir-1.dim_1024x1280.jpg",
        alt: "Kain tenun Troso bermotif sicengkir hasil produksi workshop",
        caption:
          "Kain bermotif sicengkir, salah satu hasil yang paling sering keluar dari workshop ini.",
      },
    ],
  },
  {
    id: "produksi",
    eyebrow: "Proses Produksi",
    title: "Dari Benang Menjadi Kain",
    description:
      "Tahap demi tahap yang dilalui setiap lembar kain — ditenun, diwarnai, lalu diperiksa satu per satu sebelum layak dikirim.",
    photos: [
      {
        src: "/assets/generated/products/kain-ampel-1.dim_1024x1280.jpg",
        alt: "Kain tenun bermotif ampel dengan kepadatan tenun yang rapat",
        caption:
          "Penenunan tangan: benang pakan disusun helai demi helai hingga kepadatan kain merata.",
      },
      {
        src: "/assets/generated/products/selendang-belik-1.dim_1024x1280.jpg",
        alt: "Selendang tenun dengan warna soga hasil proses pewarnaan",
        caption:
          "Pewarnaan: benang dicelup berulang hingga warna soga meresap rata dan matang.",
      },
      {
        src: "/assets/generated/products/sarung-kedawung-1.dim_1024x1280.jpg",
        alt: "Sarung tenun bermotif kedawung yang telah selesai difinishing",
        caption:
          "Finishing: tepi kain dirapikan dan setiap lembar diperiksa sebelum dikemas.",
      },
    ],
  },
];

/** Resolve a gallery photo to a displayable source, falling back when empty. */
export function galleryPhotoSrc(photo: GalleryPhoto): string {
  return photo.src.trim().length > 0 ? photo.src : FALLBACK_PRODUCT_IMAGE;
}
