import { ArchivePhoto } from "@/components/ArchivePhoto";
import type { Legend } from "@/lib/schemas";

/** Полная карточка легенды для /lyudi — фото + роль, годы, текст. */
export function LegendDetailCard({ legend }: { legend: Legend }) {
  return (
    <article id={legend.id} className="flex min-w-0 scroll-mt-24 flex-col gap-4">
      <ArchivePhoto slotId={legend.photoSlot} sizes="(min-width: 768px) 30vw, 90vw" />
      <div className="min-w-0">
        <p className="text-figure text-2xl break-words">{legend.name}</p>
        <p className="text-pushkar text-sm">
          {legend.role}
          {legend.yearsInClub && <span className="text-mist"> · {legend.yearsInClub}</span>}
          {legend.lifeYears && <span className="text-mist"> · {legend.lifeYears}</span>}
        </p>
        <p className="text-ivory mt-3 text-lg font-medium break-words">{legend.headline}</p>
        <p className="text-ivory/80 mt-2 leading-relaxed break-words">{legend.text}</p>
      </div>
    </article>
  );
}
