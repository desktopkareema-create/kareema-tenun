const STEPS = [
  {
    step: "01",
    title: "Penenunan Tangan",
    lead: "ATBM, alat tenun bukan mesin",
    body: "Benang lungsi direntangkan pada alat tenun bukan mesin (ATBM) kayu, lalu ditenun helai demi helai dengan kaki dan tangan yang bergerak seirama. Tanpa mesin otomatis, kepadatan dan kerataan kain sepenuhnya bergantung pada ketelitian pengrajin — inilah yang memberi tenun Troso tekstur khasnya.",
    details: [
      "Penyetelan lungsi",
      "Tenun pakan manual",
      "Kontrol kepadatan kain",
    ],
  },
  {
    step: "02",
    title: "Pewarnaan",
    lead: "Pewarna alami dan tradisional",
    body: "Sebagian benang diwarnai dengan bahan alami seperti kulit kayu tingi, mengkudu, dan indigo, sebagian lain dengan pewarna tekstil pilihan yang tahan lama. Proses pencelupan dilakukan berulang hingga warna meresap rata, lalu benang dijemur di bawah sinar matahari agar warnanya matang dan tidak mudah pudar.",
    details: [
      "Pencelupan berulang",
      "Pewarna alami pilihan",
      "Penjemuran alami",
    ],
  },
  {
    step: "03",
    title: "Finishing",
    lead: "Penyelesaian dan pemeriksaan mutu",
    body: "Setelah kain selesai ditenun, tepinya dirapikan, serat yang menggantung dibersihkan, dan permukaannya disetrika dengan hati-hati. Setiap lembar diperiksa satu per satu — memastikan tidak ada cacat tenun, warna yang belang, atau jahitan yang meleset sebelum dinyatakan layak dikirim.",
    details: [
      "Perapian tepi kain",
      "Pemeriksaan mutu",
      "Pelipatan dan pengemasan",
    ],
  },
] as const;

/** WeavingProcess — the three-stage production process, presented as steps. */
export function WeavingProcess() {
  return (
    <section
      data-ocid="about.process_section"
      className="bg-secondary border-border border-b"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-accent font-mono text-[0.7rem] tracking-[0.32em] uppercase">
            Proses Pembuatan
          </p>
          <h2 className="text-balance mt-6 text-3xl leading-[1.15] sm:text-4xl">
            Tiga Tahap Menuju Selembar Kain
          </h2>
          <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
            Tidak ada jalan pintas dalam menenun. Setiap lembar kain KAREEMA
            melewati tiga tahap yang sama, dikerjakan dengan tangan dan
            kesabaran.
          </p>
        </div>

        <ol className="mt-14 grid gap-px lg:grid-cols-3">
          {STEPS.map((item) => (
            <li
              key={item.step}
              data-ocid={`about.process_step.${item.step}`}
              className="bg-card border-border group relative flex flex-col border p-8 transition-smooth hover:border-accent/50 lg:p-10"
            >
              <span
                aria-hidden="true"
                className="text-accent/25 font-display text-5xl leading-none tracking-[0.05em]"
              >
                {item.step}
              </span>
              <h3 className="mt-6 text-lg tracking-[0.16em]">{item.title}</h3>
              <p className="text-accent mt-2 font-mono text-[0.68rem] tracking-[0.18em] uppercase">
                {item.lead}
              </p>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                {item.body}
              </p>
              <ul className="border-border mt-7 space-y-2.5 border-t pt-6">
                {item.details.map((detail) => (
                  <li
                    key={detail}
                    className="text-foreground/80 flex items-start gap-3 text-xs tracking-[0.06em]"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-accent mt-1.5 h-px w-4 shrink-0"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
