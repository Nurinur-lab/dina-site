import Link from "next/link";

/**
 * Хлебные крошки для внутренних страниц (CLAUDE.md, раздел 8).
 * Структурированные данные BreadcrumbList добавляются в фазе 5.
 */
export function Breadcrumbs({ current }: { current: string }) {
  return (
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
  );
}
