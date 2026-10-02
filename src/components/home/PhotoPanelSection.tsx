import { ArchivePhoto } from "@/components/ArchivePhoto";
import { Button } from "@/components/Button";
import { photos } from "@/lib/content";

/** Блок 7 — «Фото-панно». Асимметричная мозаика через CSS-колонки: разные aspect-ratio сами создают неровные ряды. */
export function PhotoPanelSection() {
  const slotIds = photos.gallery.slotIds;

  return (
    <section aria-labelledby="photo-panel-heading" className="container-site py-20 md:py-28">
      <div className="mb-10 flex flex-col items-start gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <h2 id="photo-panel-heading" className="text-4xl md:text-5xl">
          {photos.gallery.title}
        </h2>
        <Button variant="secondary" href="/foto">
          Смотреть историю в фотографиях
        </Button>
      </div>

      <div className="columns-2 gap-3 md:columns-4 md:gap-4">
        {slotIds.map((slotId) => (
          <ArchivePhoto
            key={slotId}
            slotId={slotId}
            sizes="(min-width: 768px) 25vw, 50vw"
            className="mb-3 break-inside-avoid md:mb-4"
          />
        ))}
      </div>
    </section>
  );
}
