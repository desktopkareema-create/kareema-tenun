import { COMPANY_SUMMARY } from "@/lib/contact";

const MILESTONES = [
  {
    year: "1970-an",
    title: "Akar di Troso",
    body: "Keterampilan menenun tumbuh di Troso, Jepara, diwariskan dari satu generasi pengrajin ke generasi berikutnya tanpa pernah putus.",
  },
  {
    year: "2014",
    title: "KAREEMA Lahir",
    body: "Kami mulai menaungi pengrajin Troso dengan satu keyakinan: tenun tangan layak mendapat tempat di rumah masa kini.",
  },
  {
    year: "Kini",
    title: "Kriya yang Bertumbuh",
    body: "Lebih dari tiga puluh pengrajin mitra bekerja bersama kami, dengan upah yang adil dan motif yang terus dijaga keasliannya.",
  },
] as const;

/** CompanyStory — the KAREEMA story and the Jepara tenun heritage. */
export function CompanyStory() {
  return (
    <section
      data-ocid="about.story_section"
      className="bg-background border-border border-b"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20 lg:px-8 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-accent font-mono text-[0.7rem] tracking-[0.32em] uppercase">
            Cerita Kami
          </p>
          <h2 className="text-balance mt-6 text-3xl leading-[1.15] sm:text-4xl">
            Warisan Tenun dari Troso, Jepara
          </h2>
          <div className="bg-accent mt-8 h-px w-16" />
          <p className="text-muted-foreground mt-8 text-sm leading-relaxed">
            {COMPANY_SUMMARY}
          </p>
        </div>

        <div className="space-y-10">
          <div className="space-y-6 text-[0.95rem] leading-[1.85]">
            <p>
              Di Troso, sebuah desa di pesisir utara Jepara, menenun bukan
              sekadar pekerjaan — ia adalah bahasa yang diwariskan. Sejak
              puluhan tahun lalu, perempuan dan laki-laki di desa ini duduk di
              depan alat tenun bukan mesin (ATBM) di beranda rumah mereka,
              menyusun benang demi benang menjadi kain yang bercerita.
              Motif-motifnya tidak pernah disimpan dalam buku pola; ia hidup di
              ingatan, diajarkan dari ibu kepada anak, dari tetangga kepada
              tetangga.
            </p>
            <p>
              KAREEMA lahir dari kekaguman pada warisan itu. Kami tidak
              memproduksi kain di pabrik, melainkan bekerja bersama pengrajin
              Troso yang telah menekuni keterampilan ini sepanjang hidup mereka.
              Setiap helai yang kami hadirkan melewati tangan-tangan yang sama
              yang telah menenun ribuan meter kain sebelumnya — sabar, teliti,
              dan penuh rasa memiliki.
            </p>
            <p>
              Bagi kami, tenun Jepara adalah bukti bahwa keindahan sejati lahir
              dari waktu. Satu lembar kain bisa memakan berhari-hari untuk
              diselesaikan, dan justru di situlah nilainya. Kami memilih untuk
              tidak mempercepat apa pun, agar setiap produk yang sampai ke
              tangan Anda membawa serta ketenangan prosesnya.
            </p>
          </div>

          <ol className="border-border divide-border divide-y border-t">
            {MILESTONES.map((item) => (
              <li
                key={item.year}
                className="grid gap-2 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6"
              >
                <span className="text-accent font-mono text-xs tracking-[0.2em]">
                  {item.year}
                </span>
                <div>
                  <h3 className="text-sm tracking-[0.16em]">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
