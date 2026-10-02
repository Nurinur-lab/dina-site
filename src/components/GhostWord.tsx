/**
 * Слово-«призрак»: огромный текст («ДИНА» или год) цветом чуть светлее фона
 * позади заголовка (референс — OCTOBER на сайте «Барселоны»).
 * Декоративный элемент — скрыт от скринридеров.
 *
 * Размер задаётся инлайн-стилем (vw), а не классом Tailwind: у вызывающих
 * компонентов разные потребности в размере (на весь экран в hero vs рядом с
 * текстом в таймлайне), а порядок классов в строке className не гарантирует
 * победу в каскаде над уже определённым в компоненте классом того же свойства.
 */
export function GhostWord({
  children,
  className = "",
  size = "clamp(6rem, 28vw, 17.5rem)",
}: {
  children: string;
  className?: string;
  /** CSS-значение font-size, например "28vw" или "clamp(4rem, 18vw, 11rem)". */
  size?: string;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ fontSize: size }}
      className={`text-figure pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[#141c33] select-none ${className}`}
    >
      {children}
    </span>
  );
}
