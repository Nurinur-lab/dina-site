import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { getPhotoSlot } from "@/lib/content";
import { photoFileExists } from "@/lib/photo-fs";
import { isArchivalEra, parseAspectRatio } from "@/lib/photo-meta";

/**
 * Фото пока нет (CLAUDE.md, раздел 5 «Фото»). Компонент берёт файл по id из
 * content/photos.json; если файла нет — рисует типографический фолбэк:
 * тёмная панель, год/эпоха огромными цифрами, тонкая полоса цветов. Сайт
 * должен выглядеть законченным без единой фотографии.
 *
 * Архив до 2010 года обрабатывается как ч/б с тонировкой в сторону --night,
 * 2012 и позже — цветной с приглушённой насыщенностью.
 */

type ArchivePhotoProps = {
  slotId: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Для full-bleed секций (hero): размер задаёт родитель (h-dvh и т. п.), а не aspect-ratio слота. */
  fillParent?: boolean;
};

export function ArchivePhoto({
  slotId,
  sizes,
  priority = false,
  className = "",
  imageClassName = "",
  fillParent = false,
}: ArchivePhotoProps) {
  const slot = getPhotoSlot(slotId);
  const fileExists = photoFileExists(slot.file);
  const aspectRatio = parseAspectRatio(slot.aspect);
  const sizingStyle = fillParent ? undefined : { aspectRatio };
  const sizingClassName = fillParent ? "h-full w-full" : "";

  if (!fileExists) {
    // В full-bleed режиме (hero) типографический фолбэк конфликтует со словом-«призраком»
    // и заголовком, которые уже стоят поверх — там фон должен быть тихим.
    if (fillParent) {
      return (
        <div
          className={`bg-night-2 relative overflow-hidden ${sizingClassName} ${className}`}
          style={sizingStyle}
        />
      );
    }

    return (
      <div
        className={`bg-night-2 relative flex items-center justify-center overflow-hidden ${sizingClassName} ${className}`}
        style={{ ...sizingStyle, containerType: "inline-size" }}
      >
        <span className="text-figure text-ivory/45 px-[10%] text-center [font-size:15cqi] break-words uppercase">
          {slot.fallbackText}
        </span>
        <div className="absolute inset-x-0 bottom-0 flex h-[3%] min-h-[3px]">
          <div className="bg-shield flex-1" />
          <div className="bg-pushkar flex-1" />
          <div className="bg-field flex-1" />
        </div>
      </div>
    );
  }

  const archival = isArchivalEra(slot.era);

  return (
    <div className={`relative overflow-hidden ${sizingClassName} ${className}`} style={sizingStyle}>
      <Image
        src={withBasePath(`/photos/${slot.file}`)}
        alt={slot.caption ?? slot.description}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${archival ? "grayscale-[85%] sepia-[8%]" : "saturate-[85%]"} ${imageClassName}`}
      />
    </div>
  );
}
