import { ArchivePhoto } from "@/components/ArchivePhoto";
import { people } from "@/lib/content";

/** Блок 6 — «Из «Дины» — в большую игру». */
export function AlumniSection() {
  const title = people.sectionTitleOptions[0] ?? "Из «Дины» — в большую игру";

  return (
    <section aria-labelledby="alumni-heading" className="container-site py-20 md:py-28">
      <h2 id="alumni-heading" className="mb-10 text-4xl md:mb-14 md:text-5xl">
        {title}
      </h2>

      <div className="grid gap-8 sm:grid-cols-3 md:gap-10">
        {people.alumni.map((alumnus) => (
          <div key={alumnus.id} className="flex flex-col gap-4">
            <ArchivePhoto slotId={alumnus.photoSlot} sizes="(min-width: 768px) 25vw, 80vw" />
            <div>
              <p className="text-figure text-ivory text-xl">{alumnus.name}</p>
              <p className="text-mist mt-1 text-sm">{alumnus.link}</p>
              <p className="text-ivory/80 mt-2 text-sm">
                {alumnus.knownFor}
                {alumnus.knownForAsOf && (
                  <span className="text-mist"> (по данным на {alumnus.knownForAsOf})</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
