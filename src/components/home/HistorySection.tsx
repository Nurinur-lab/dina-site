import { ArchivePhoto } from "@/components/ArchivePhoto";
import { Button } from "@/components/Button";
import { club } from "@/lib/content";

const eraPhotoSlots = ["era-1991", "era-dynasty", "era-euro-1999"];

/** Блок 3 — «История коротко». */
export function HistorySection() {
  return (
    <section aria-labelledby="history-heading" className="container-site py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
        <div className="flex flex-col gap-6">
          <h2 id="history-heading" className="text-4xl md:text-5xl">
            История
          </h2>
          <div className="flex flex-col gap-4">
            {club.historyIntro.map((paragraph, i) => (
              <p key={i} className="text-ivory/85 max-w-[65ch] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <div>
            <Button variant="secondary" href="/istoriya">
              История «Дины»
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {eraPhotoSlots.map((slotId, i) => (
            <ArchivePhoto
              key={slotId}
              slotId={slotId}
              sizes="(min-width: 768px) 20vw, 30vw"
              className={i === 0 ? "col-span-3 md:col-span-1" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
