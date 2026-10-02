import { CountUpNumber } from "@/components/CountUpNumber";
import { featuredTrophies } from "@/lib/content";

/** Блок 2 — «Масштаб». Большие цифры, не таблица и не карточки (CLAUDE.md, раздел 4). */
export function ScaleSection() {
  return (
    <section aria-labelledby="scale-heading" className="container-site py-20 md:py-28">
      <h2 id="scale-heading" className="sr-only">
        Масштаб клуба
      </h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {featuredTrophies.map((trophy) => (
          <div key={trophy.id} className="flex flex-col">
            <dt className="text-mist order-2 mt-2 text-sm md:text-base">{trophy.label}</dt>
            <dd className="order-1">
              <CountUpNumber
                value={trophy.count}
                className="text-figure text-pushkar text-[18vw] leading-none md:text-[7vw]"
              />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
