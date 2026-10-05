import type { Metadata } from "next";
import { ArchivePhoto } from "@/components/ArchivePhoto";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GalleryProvider } from "@/components/foto/GalleryProvider";
import { GalleryTrigger } from "@/components/foto/GalleryTrigger";
import type { LightboxItem } from "@/components/foto/types";
import { PageHeader } from "@/components/PageHeader";
import { withBasePath } from "@/lib/base-path";
import { getPhotoSlot, photos } from "@/lib/content";
import { photoFileExists } from "@/lib/photo-fs";
import { isArchivalEra } from "@/lib/photo-meta";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "История «Дины» в фотографиях",
  description:
    "Фотографии ключевых моментов истории ИФК «Дина» (Москва): чемпионства России, победы в Турнире европейских чемпионов и Межконтинентальный кубок 1997 года.",
  path: "/foto",
});

export default function FotoPage() {
  const slotIds = photos.gallery.slotIds;
  const items: LightboxItem[] = slotIds.map((slotId) => {
    const slot = getPhotoSlot(slotId);
    const hasFile = photoFileExists(slot.file);
    return {
      id: slot.id,
      src: hasFile ? withBasePath(`/photos/${slot.file}`) : null,
      alt: slot.caption ?? slot.description,
      caption: slot.caption,
      credit: slot.credit,
      fallbackText: slot.fallbackText,
      archival: isArchivalEra(slot.era),
    };
  });

  return (
    <main>
      <Breadcrumbs current="Фотографии" path="/foto" />
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
