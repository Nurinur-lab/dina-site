/**
 * Фирменная диагональная полоса синий/жёлтый/зелёный под углом −18°, как на
 * щите герба. Главный узнаваемый элемент сайта — используется максимум
 * 3 раза за страницу (CLAUDE.md, раздел 5): низ hero, переход к «Дина
 * сегодня», футер.
 */
export function DiagonalStripe({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-10 w-full overflow-hidden md:h-16 ${className}`} aria-hidden="true">
      <div
        className="absolute inset-y-0 flex"
        style={{ left: "-15%", right: "-15%", transform: "skewX(-18deg)" }}
      >
        <div className="bg-shield flex-1" />
        <div className="bg-pushkar flex-1" />
        <div className="bg-field flex-1" />
      </div>
    </div>
  );
}
