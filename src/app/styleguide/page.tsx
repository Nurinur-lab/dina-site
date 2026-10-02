import { notFound } from "next/navigation";
import { ArchivePhoto } from "@/components/ArchivePhoto";
import { Button } from "@/components/Button";
import { DiagonalStripe } from "@/components/DiagonalStripe";
import { GhostWord } from "@/components/GhostWord";

const colors = [
  { name: "night", var: "--night", label: "Основной фон" },
  { name: "night-2", var: "--night-2", label: "Приподнятые поверхности" },
  { name: "ivory", var: "--ivory", label: "Основной текст" },
  { name: "mist", var: "--mist", label: "Вторичный текст" },
  { name: "pushkar", var: "--pushkar", label: "Жёлтый «пушкарей»" },
  { name: "field", var: "--field", label: "Зелёный" },
  { name: "shield", var: "--shield", label: "Синий (только полоса)" },
  { name: "crown", var: "--crown", label: "Золото короны" },
] as const;

/** Внутренняя страница для самопроверки дизайн-системы. Недоступна в продакшене. */
export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="container-site flex flex-col gap-16 py-16">
      <section>
        <h1 className="text-5xl md:text-7xl">Стайлгайд</h1>
        <p className="text-mist mt-2 max-w-prose">
          Служебная страница дизайн-системы «Возвращение». Доступна только в dev.
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-3xl">Цвета</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {colors.map((c) => (
            <div key={c.name} className="flex flex-col gap-2">
              <div
                className="border-line h-20 w-full border"
                style={{ background: `var(${c.var})` }}
              />
              <p className="text-sm">{c.name}</p>
              <p className="text-mist text-xs">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-3xl">Типографика</h2>
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl md:text-8xl">ЗАГОЛОВОК H1</h1>
          <h2 className="text-5xl">ЗАГОЛОВОК H2</h2>
          <h3 className="text-3xl">Заголовок H3</h3>
          <p className="max-w-[70ch] text-base leading-relaxed">
            Основной текст набран шрифтом Golos Text — хорошая читаемость кириллицы, межстрочный
            интервал 1.6, длина строки до 70 знаков.
          </p>
          <p className="text-figure text-6xl">1991</p>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-3xl">Кнопки</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" href="#">
            Основная кнопка
          </Button>
          <Button variant="secondary" href="#">
            Вторичная кнопка
          </Button>
          <Button variant="ghost" href="#">
            Текстовая ссылка
          </Button>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-3xl">Диагональная полоса</h2>
        <DiagonalStripe />
      </section>

      <section>
        <h2 className="mb-6 text-3xl">Слово-«призрак»</h2>
        <div className="relative flex h-48 items-center justify-center overflow-hidden">
          <GhostWord>ДИНА</GhostWord>
          <h2 className="relative text-5xl">НАД ПРИЗРАКОМ</h2>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-3xl">ArchivePhoto — фолбэк</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ArchivePhoto slotId="legend-eremenko" sizes="200px" className="w-full" />
          <ArchivePhoto slotId="era-1991" sizes="200px" className="w-full" />
          <ArchivePhoto slotId="hero-main" sizes="200px" className="w-full" />
          <ArchivePhoto slotId="alumni-niyazov" sizes="200px" className="w-full" />
        </div>
      </section>
    </main>
  );
}
