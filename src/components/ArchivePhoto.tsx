import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { getPhotoSlot } from "@/lib/content";

/**
 * Фото пока нет (CLAUDE.md, раздел 5 «Фото»). Компонент берёт файл по id из
 * content/photos.json; если файла нет — рисует типографический фолбэк:
 * тёмная панель, год/эпоха огромными цифрами, тонкая полоса цветов. Сайт
 * должен выглядеть законченным без единой фотографии.
 *
 * Архив до 2010 года обрабатывается как ч/б с тонировкой в сторону --night,
 * 2012 и позже — цветной с приглушённой насыщенностью.
 */

function parseAspectRatio(aspect: string): string {
  const [w, h] = aspect.split(":").map(Number);
  if (!w || !h) return "1 / 1";
  return `${w} / ${h}`;
}

/** Первый найденный 4-значный год в строке эпохи — используется, чтобы решить, архивное фото или нет. */
function firstYear(era: string): number | null {
  const match = era.match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

function isArchival(era: string): boolean {
  const year = firstYear(era);
  if (year === null) return false; // "любая" и подобное — без ч/б обработки
  return year < 2010;
}

type ArchivePhotoProps = {
  slotId: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

export function ArchivePhoto({
  slotId,
  sizes,
  priority = false,
  className = "",
  imageClassName = "",
}: ArchivePhotoProps) {
  const slot = getPhotoSlot(slotId);
  const filePath = path.join(process.cwd(), "public", "photos", slot.file);
  const fileExists = fs.existsSync(filePath);
  const aspectRatio = parseAspectRatio(slot.aspect);

  if (!fileExists) {
    return (
      <div
        className={`bg-night-2 relative flex items-center justify-center overflow-hidden ${className}`}
        style={{ aspectRatio, containerType: "inline-size" }}
      >
        <span className="text-figure text-ivory/35 px-[8%] text-center [font-size:20cqi] break-words uppercase">
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

  const archival = isArchival(slot.era);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
      <Image
        src={`/photos/${slot.file}`}
        alt={slot.caption ?? slot.description}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${archival ? "grayscale-[85%] sepia-[8%]" : "saturate-[85%]"} ${imageClassName}`}
      />
    </div>
  );
}
