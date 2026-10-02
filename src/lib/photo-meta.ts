/** Чистые хелперы для работы с метаданными фото (без доступа к файловой системе) — можно импортировать и в клиентские компоненты. */

export function parseAspectRatio(aspect: string): string {
  const [w, h] = aspect.split(":").map(Number);
  if (!w || !h) return "1 / 1";
  return `${w} / ${h}`;
}

/** Первый найденный 4-значный год в строке эпохи. */
function firstYear(era: string): number | null {
  const match = era.match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

/** Архив до 2010 года — ч/б тонировка; "любая" и 2012+ — без неё (CLAUDE.md, раздел 5 «Фото»). */
export function isArchivalEra(era: string): boolean {
  const year = firstYear(era);
  if (year === null) return false;
  return year < 2010;
}
