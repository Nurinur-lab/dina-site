import { ArchivePhoto } from "@/components/ArchivePhoto";
import { GhostWord } from "@/components/GhostWord";
import type { TimelineEvent } from "@/lib/schemas";

/** Один этап таймлайна истории клуба. Чётные/нечётные меняются местами на десктопе. */
export function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <div className="relative grid gap-8 py-16 md:grid-cols-2 md:items-center md:gap-16 md:py-24">
      <div className={reversed ? "md:order-2" : ""}>
        <div className="relative overflow-hidden py-2">
          <GhostWord size="clamp(3.5rem, 20vw, 9rem)">{event.ghost}</GhostWord>
          <p className="text-pushkar relative text-lg font-medium">{event.period}</p>
          <h2 className="relative mt-1 text-4xl md:text-5xl">{event.title}</h2>
        </div>
        <p className="text-ivory/85 relative mt-4 max-w-[60ch] leading-relaxed">{event.text}</p>
      </div>

      <ArchivePhoto
        slotId={event.photoSlot}
        sizes="(min-width: 768px) 45vw, 90vw"
        className={reversed ? "md:order-1" : ""}
      />
    </div>
  );
}
