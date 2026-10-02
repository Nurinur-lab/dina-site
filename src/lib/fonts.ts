/**
 * Шрифты дизайн-системы (CLAUDE.md, раздел 5). Самохостятся при сборке через
 * next/font/google — у посетителя браузер не делает запросов к Google.
 *
 * Только эти два семейства во всём проекте:
 * — Fira Sans Extra Condensed (800) — заголовки, цифры, слово-«призрак»;
 * — Golos Text (400, 500) — основной текст.
 *
 * Вес 500 у Fira Sans Extra Condensed не заказываем: в вёрстке везде, где
 * используется этот шрифт (`.text-figure`, h1–h4), жёстко задан вес 800 —
 * лишний файл только добавлял конкурирующую загрузку шрифтов и заметно
 * увеличивал LCP под троттлингом в Lighthouse (раздел 10 CLAUDE.md).
 */
import { Fira_Sans_Extra_Condensed, Golos_Text } from "next/font/google";

export const firaSansExtraCondensed = Fira_Sans_Extra_Condensed({
  variable: "--font-display",
  subsets: ["cyrillic", "latin"],
  weight: "800",
  display: "swap",
});

export const golosText = Golos_Text({
  variable: "--font-text",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});
