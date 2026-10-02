/**
 * Шрифты дизайн-системы (CLAUDE.md, раздел 5). Самохостятся при сборке через
 * next/font/google — у посетителя браузер не делает запросов к Google.
 *
 * Только эти два семейства во всём проекте:
 * — Fira Sans Extra Condensed (800, 500) — заголовки, цифры, слово-«призрак»;
 * — Golos Text (400, 500) — основной текст.
 */
import { Fira_Sans_Extra_Condensed, Golos_Text } from "next/font/google";

export const firaSansExtraCondensed = Fira_Sans_Extra_Condensed({
  variable: "--font-display",
  subsets: ["cyrillic", "latin"],
  weight: ["500", "800"],
  display: "swap",
});

export const golosText = Golos_Text({
  variable: "--font-text",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});
