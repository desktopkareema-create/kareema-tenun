import { Gem, HandHeart, Leaf } from "lucide-react";

const VALUES = [
  {
    icon: Gem,
    title: "Kualitas Premium",
    body: "Kami tidak berkompromi pada mutu. Setiap lembar kain diperiksa satu per satu, dan hanya yang lolos standar kami yang layak sampai ke tangan Anda. Bahan dipilih dari serat terbaik, dengan kepadatan tenun yang konsisten.",
    commitments: [
      "Pemeriksaan mutu menyeluruh",
      "Bahan berserat pilihan",
      "Garansi kerajinan tangan",
    ],
  },
  {
    icon: HandHeart,
    title: "Pelestarian Warisan Budaya",
    body: "Motif tenun Troso adalah warisan yang tidak tertulis. Kami mendokumentasikan, menjaga, dan memperkenalkannya kembali kepada generasi muda agar keterampilan ini tidak berhenti di satu angkatan saja.",
    commitments: [
      "Motif tradisional terjaga",
      "Pelatihan pengrajin muda",
      "Dokumentasi kriya",
    ],
  },
  {
    icon: Leaf,
    title: "Pemberdayaan Pengrajin Lokal",
    body: "Kami bekerja langsung bersama pengrajin di Troso, bukan melalui perantara. Upah yang adil, pesanan yang berkelanjutan, dan hubungan jangka panjang adalah cara kami memastikan kriya ini menghidupi keluarga yang mengerjakannya.",
    commitments: [
      "Upah adil dan transparan",
      "Kemitraan jangka panjang",
      "Pesanan berkelanjutan",
    ],
  },
] as const;

/** CompanyValues — the company's values and commitments. */
export function CompanyValues() {
  return (
    <section
      data-ocid="about.values_section"
      className="bg-background border-border border-b"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-accent font-mono text-[0.7rem] tracking-[0.32em] uppercase">
            Nilai &amp; Komitmen
          </p>
          <h2 className="text-balance mt-6 text-3xl leading-[1.15] sm:text-4xl">
            Yang Kami Pegang Teguh
          </h2>
          <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
            Tiga prinsip yang menentukan setiap keputusan kami — dari memilih
            benang hingga mengemas pesanan Anda.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <article
                key={value.title}
                data-ocid={`about.value_card.${value.title
                  .toLowerCase()
                  .replace(/\s+/g, "_")}`}
                className="bg-card border-border flex flex-col border p-8 transition-smooth hover:border-accent/50 lg:p-10"
              >
                <span className="border-accent/40 text-accent inline-flex size-12 items-center justify-center border">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-7 text-lg tracking-[0.16em]">
                  {value.title}
                </h3>
                <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                  {value.body}
                </p>
                <ul className="border-border mt-7 space-y-2.5 border-t pt-6">
                  {value.commitments.map((item) => (
                    <li
                      key={item}
                      className="text-foreground/80 flex items-start gap-3 text-xs tracking-[0.06em]"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-accent mt-1.5 h-px w-4 shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
