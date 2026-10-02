import { club } from "@/lib/content";
import type { Legend } from "@/lib/schemas";
import { SITE_URL } from "@/lib/seo";

/**
 * Schema.org JSON-LD (CLAUDE.md, раздел 8). Только подтверждённые поля —
 * null-поля в исходных данных просто не попадают в разметку.
 */
export function buildSportsOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: club.displayFullName,
    alternateName: club.shortName,
    url: SITE_URL,
    foundingDate: club.foundingDate,
    sport: "Futsal",
    founder: {
      "@type": "Person",
      name: club.founder,
    },
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: club.city,
        addressCountry: "RU",
      },
    },
  };
}

/** "1970–2010" → { birthDate: "1970", deathDate: "2010" }. Любой другой формат — пропускается. */
function parseLifeYears(lifeYears: string | null): { birthDate?: string; deathDate?: string } {
  if (!lifeYears) return {};
  const match = lifeYears.match(/^(\d{4})\s*[–-]\s*(\d{4})$/);
  if (!match) return {};
  return { birthDate: match[1], deathDate: match[2] };
}

export function buildPersonSchema(legend: Legend) {
  return {
    "@type": "Person",
    name: legend.name,
    jobTitle: legend.role,
    affiliation: {
      "@type": "SportsOrganization",
      name: club.shortName,
    },
    ...parseLifeYears(legend.lifeYears),
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}
