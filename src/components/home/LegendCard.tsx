import Link from "next/link";
import { ArchivePhoto } from "@/components/ArchivePhoto";
import type { Legend } from "@/lib/schemas";

/** Вертикальная карточка легенды — референс карточек игроков ФК «Барселона». */
export function LegendCard({ legend }: { legend: Legend }) {
  return (
    <Link
      href={`/lyudi#${legend.id}`}
      className="group relative block overflow-hidden"
      aria-label={`${legend.name} — ${legend.headline}`}
    >
      <ArchivePhoto
        slotId={legend.photoSlot}
        sizes="(min-width: 768px) 30vw, 45vw"
        imageClassName="transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="from-night/95 absolute inset-0 flex flex-col justify-end bg-gradient-to-t via-transparent to-transparent p-4">
        <p className="text-figure text-ivory text-2xl md:text-3xl">{legend.name}</p>
        <p className="text-pushkar text-sm">{legend.role}</p>
      </div>
    </Link>
  );
}
