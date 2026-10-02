import { ArchivePhoto } from "@/components/ArchivePhoto";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GalleryProvider } from "@/components/foto/GalleryProvider";
import { GalleryTrigger } from "@/components/foto/GalleryTrigger";
import type { LightboxItem } from "@/components/foto/types";
import { PageHeader } from "@/components/PageHeader";
import { getPhotoSlot, photos } from "@/lib/content";
import { photoFileExists } from "@/lib/photo-fs";
import { isArchivalEra } from "@/lib/photo-meta";

export default function FotoPage() {
  const slotIds = photos.gallery.slotIds;
  const items: LightboxItem[] = slotIds.map((slotId) => {
    const slot = getPhotoSlot(slotId);
    const hasFile = photoFileExists(slot.file);
    return {
      id: slot.id,
      src: hasFile ? `/photos/${slot.file}` : null,
      alt: slot.caption ?? slot.description,
      caption: slot.caption,
      credit: slot.credit,
      fallbackText: slot.fallbackText,
      archival: isArchivalEra(slot.era),
    };
  });

  return (
    <main>
      <Breadcrumbs current="Фотографии" />
      <PageHeader
        title={photos.gallery.title}
        intro="Моменты, за которые «Дину» помнят: чемпионства, еврокубки и Межконтинентальный кубок."
      />

      <section aria-label="Галерея фотографий" className="container-site pb-20 md:pb-28">
        <GalleryProvider items={items}>
          <div className="columns-2 gap-3 md:columns-3 md:gap-4">
            {slotIds.map((slotId, index) => (
              <GalleryTrigger
                key={slotId}
                index={index}
                label={`Открыть фотографию ${index + 1} из ${slotIds.length}`}
                className="mb-3 break-inside-avoid md:mb-4"
              >
                <ArchivePhoto slotId={slotId} sizes="(min-width: 768px) 33vw, 50vw" />
              </GalleryTrigger>
            ))}
          </div>
        </GalleryProvider>
      </section>
    </main>
  );
}
