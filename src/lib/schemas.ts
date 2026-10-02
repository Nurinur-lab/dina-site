/**
 * Zod-схемы для всех файлов content/*.json.
 *
 * Правило проекта (CLAUDE.md, раздел «Жёсткие правила контента»):
 * — значение null означает «факт не подтверждён» и не выводится на сайт;
 * — здесь мы только проверяем форму данных, а не придумываем значения.
 */
import { z } from "zod";

const sourceId = z.string().min(1);

// ---------------------------------------------------------------------------
// club.json
// ---------------------------------------------------------------------------

const contactsSchema = z.object({
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  socials: z.array(
    z.object({
      label: z.string(),
      url: z.string().url(),
    }),
  ),
});

const requisitesSchema = z
  .object({
    legalName: z.string().nullable(),
    inn: z.string().nullable(),
    ogrn: z.string().nullable(),
    legalAddress: z.string().nullable(),
  })
  .nullable();

export const clubSchema = z.object({
  shortName: z.string().min(1),
  displayFullName: z.string().min(1),
  abbreviation: z.string().min(1),
  nameStatus: z.enum(["confirmed", "needs_confirmation"]),
  nameNote: z.string().nullable().optional(),
  city: z.string().min(1),
  sport: z.string().min(1),
  foundingDate: z.string().min(1),
  founder: z.string().min(1),
  nickname: z.string().min(1),
  clubColors: z.string().min(1),
  tagline: z.string().min(1),
  taglineAlternatives: z.array(z.string()).default([]),
  historyIntro: z.array(z.string()).min(1),
  today: z.object({
    title: z.string().min(1),
    text: z.string().min(1),
  }),
  contacts: contactsSchema,
  requisites: requisitesSchema,
});

export type Club = z.infer<typeof clubSchema>;

// ---------------------------------------------------------------------------
// people.json
// ---------------------------------------------------------------------------

const legendSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  lifeYears: z.string().nullable(),
  yearsInClub: z.string().nullable(),
  headline: z.string().min(1),
  text: z.string().min(1),
  featured: z.boolean(),
  photoSlot: z.string().min(1),
  sources: z.array(sourceId).default([]),
});

const alumniSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  linkType: z.string().min(1),
  link: z.string().min(1),
  knownFor: z.string().min(1),
  knownForAsOf: z.string().nullable().optional(),
  photoSlot: z.string().min(1),
  sources: z.array(sourceId).default([]),
});

export const peopleSchema = z.object({
  legends: z.array(legendSchema),
  alumni: z.array(alumniSchema),
  sectionTitleOptions: z.array(z.string()).default([]),
});

export type Legend = z.infer<typeof legendSchema>;
export type Alumnus = z.infer<typeof alumniSchema>;
export type People = z.infer<typeof peopleSchema>;

// ---------------------------------------------------------------------------
// photos.json
// ---------------------------------------------------------------------------

const photoSlotSchema = z.object({
  id: z.string().min(1),
  file: z.string().min(1),
  aspect: z.string().min(1),
  era: z.string().min(1),
  required: z.boolean(),
  description: z.string().min(1),
  caption: z.string().nullable(),
  credit: z.string().nullable(),
  fallbackText: z.string().min(1),
});

export const photosSchema = z.object({
  note: z.string().optional(),
  slots: z.array(photoSlotSchema),
  gallery: z.object({
    title: z.string().min(1),
    maxItems: z.number().int().positive(),
    slotIds: z.array(z.string()),
    note: z.string().optional(),
  }),
});

export type PhotoSlot = z.infer<typeof photoSlotSchema>;
export type Photos = z.infer<typeof photosSchema>;

// ---------------------------------------------------------------------------
// sources.json
// ---------------------------------------------------------------------------

export const sourcesSchema = z.object({
  sources: z.record(z.string(), z.string().url()),
});

export type Sources = z.infer<typeof sourcesSchema>;

// ---------------------------------------------------------------------------
// timeline.json
// ---------------------------------------------------------------------------

const timelineEventSchema = z.object({
  id: z.string().min(1),
  period: z.string().min(1),
  ghost: z.string().min(1),
  title: z.string().min(1),
  text: z.string().min(1),
  photoSlot: z.string().min(1),
  sources: z.array(sourceId).default([]),
});

export const timelineSchema = z.object({
  intro: z.string().min(1),
  events: z.array(timelineEventSchema).min(1),
});

export type TimelineEvent = z.infer<typeof timelineEventSchema>;
export type Timeline = z.infer<typeof timelineSchema>;

// ---------------------------------------------------------------------------
// trophies.json
// ---------------------------------------------------------------------------

const trophySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  count: z.number().int().positive(),
  years: z.array(z.number().int()),
  label: z.string().min(1),
  featured: z.boolean(),
  verified: z.boolean(),
  note: z.string().optional(),
  sources: z.array(sourceId).default([]),
});

export const trophiesSchema = z.object({
  trophies: z.array(trophySchema).min(1),
});

export type Trophy = z.infer<typeof trophySchema>;
export type Trophies = z.infer<typeof trophiesSchema>;
