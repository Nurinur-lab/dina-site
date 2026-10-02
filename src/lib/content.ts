/**
 * Единая точка загрузки контента сайта.
 *
 * Все факты о клубе живут в content/*.json и нигде больше (см. CLAUDE.md,
 * раздел «Жёсткие правила контента»). Этот модуль импортирует JSON напрямую
 * (попадает в сборку как обычный модуль — работает одинаково в dev,
 * `next build` и в standalone-выводе для Docker), проверяет его схемой Zod
 * и падает с понятной русской ошибкой, если содержимое не соответствует
 * ожидаемой форме.
 */
import clubJson from "../../content/club.json";
import peopleJson from "../../content/people.json";
import photosJson from "../../content/photos.json";
import sourcesJson from "../../content/sources.json";
import timelineJson from "../../content/timeline.json";
import trophiesJson from "../../content/trophies.json";
import {
  clubSchema,
  peopleSchema,
  photosSchema,
  sourcesSchema,
  timelineSchema,
  trophiesSchema,
  type PhotoSlot,
} from "./schemas";

function parseOrFail<T>(
  schema: { safeParse: (v: unknown) => { success: boolean; data?: T; error?: unknown } },
  data: unknown,
  fileName: string,
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const details =
      typeof result.error === "object" && result.error !== null && "message" in result.error
        ? (result.error as { message: string }).message
        : String(result.error);
    throw new Error(
      `Ошибка в content/${fileName}: содержимое не соответствует ожидаемой схеме.\n` +
        `Исправьте файл content/${fileName} — сайт не должен выдумывать факты, поэтому сборка остановлена.\n\n${details}`,
    );
  }
  return result.data as T;
}

export const club = parseOrFail(clubSchema, clubJson, "club.json");
export const people = parseOrFail(peopleSchema, peopleJson, "people.json");
export const photos = parseOrFail(photosSchema, photosJson, "photos.json");
export const sources = parseOrFail(sourcesSchema, sourcesJson, "sources.json");
export const timeline = parseOrFail(timelineSchema, timelineJson, "timeline.json");
export const trophies = parseOrFail(trophiesSchema, trophiesJson, "trophies.json");

const photoSlotsById = new Map<string, PhotoSlot>(photos.slots.map((slot) => [slot.id, slot]));

/** Найти описание фотослота по id. Бросает ошибку, если слот не описан в photos.json — это ошибка кода, а не контента. */
export function getPhotoSlot(id: string): PhotoSlot {
  const slot = photoSlotsById.get(id);
  if (!slot) {
    throw new Error(`Фотослот "${id}" не найден в content/photos.json`);
  }
  return slot;
}

/** Ссылка на источник факта по его ключу из sources.json. Возвращает null, если ключ не найден. */
export function getSourceUrl(key: string): string | null {
  return sources.sources[key] ?? null;
}

/** Легенды, отмеченные featured: true — для главной страницы. */
export const featuredLegends = people.legends.filter((legend) => legend.featured);

/** Трофеи, отмеченные featured: true — для блока «Масштаб» на главной. */
export const featuredTrophies = trophies.trophies.filter((trophy) => trophy.featured);
