import Link from "next/link";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

/** Хлебные крошки для внутренних страниц + структурированные данные BreadcrumbList (CLAUDE.md, раздел 8). */
export function Breadcrumbs({ current, path }: { current: string; path: string }) {
  const schema = buildBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: current, path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Хлебные крошки" className="container-site pt-6">
        <ol className="text-mist flex flex-wrap items-center gap-2 text-sm">
          <li>
            <Link href="/" className="hover:text-ivory">
              Главная
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ivory/80">
            {current}
          </li>
        </ol>
      </nav>
    </>
  );
}
