import type { Metadata } from "next";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { club } from "@/lib/content";
import { firaSansExtraCondensed, golosText } from "@/lib/fonts";
import { SITE_URL } from "@/lib/seo";
import { buildSportsOrganizationSchema } from "@/lib/structured-data";
import "./globals.css";

const organizationSchema = buildSportsOrganizationSchema();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: club.shortName,
    template: `%s — ${club.shortName}`,
  },
  description: club.tagline,
  // Превью на GitHub Pages (PREVIEW_STATIC=1) — демо-копия, не должна индексироваться.
  // Каждая страница переопределяет это через buildMetadata() в src/lib/seo.ts —
  // здесь задаётся значение по умолчанию на случай, если где-то его не вызвали.
  robots:
    process.env.PREVIEW_STATIC === "1"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${firaSansExtraCondensed.variable} ${golosText.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
