import { trophies } from "@/lib/content";

function formatYears(years: number[]): string {
  if (years.length <= 1) return years.join("");

  // Группируем подряд идущие годы в диапазоны: 1993,1994,1995 → «1993–1995».
  const ranges: string[] = [];
  let start = years[0];
  let prev = years[0];

  for (let i = 1; i <= years.length; i++) {
    const year = years[i];
    if (year === prev + 1) {
      prev = year;
      continue;
    }
    ranges.push(start === prev ? `${start}` : `${start}–${prev}`);
    start = year;
    prev = year;
  }

  return ranges.join(", ");
}

/** Полный список титулов — раздел «Трофеи» на странице истории. */
export function TrophiesSection() {
  return (
    <section aria-labelledby="trophies-heading" className="bg-night-2 py-20 md:py-28">
      <div className="container-site">
        <h2 id="trophies-heading" className="mb-10 text-4xl md:mb-14 md:text-5xl">
          Трофеи
        </h2>
        <ul className="divide-line divide-y">
          {trophies.trophies.map((trophy) => (
            <li
              key={trophy.id}
              className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8 md:py-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-figure text-pushkar text-4xl md:text-5xl">
                  {trophy.count}
                </span>
                <span className="text-xl md:text-2xl">{trophy.title}</span>
              </div>
              <p className="text-mist text-sm md:max-w-md md:text-right">
                {formatYears(trophy.years)}
                {trophy.note && <span className="mt-1 block">{trophy.note}</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
