/**
 * Слово-«призрак»: огромный текст («ДИНА» или год) цветом чуть светлее фона
 * позади заголовка (референс — OCTOBER на сайте «Барселоны»).
 * Декоративный элемент — скрыт от скринридеров.
 */
export function GhostWord({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`text-figure pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[28vw] whitespace-nowrap text-[#141c33] select-none md:text-[22vw] ${className}`}
    >
      {children}
    </span>
  );
}
