import { DiagonalStripe } from "@/components/DiagonalStripe";
import { club } from "@/lib/content";

/** Блок 5 — «Дина сегодня». Перед блоком — второе из трёх допустимых появлений диагональной полосы. */
export function TodaySection() {
  return (
    <section aria-labelledby="today-heading">
      <DiagonalStripe />
      <div className="container-site py-20 md:py-28">
        <div className="max-w-2xl">
          <h2 id="today-heading" className="text-4xl md:text-5xl">
            {club.today.title}
          </h2>
          <p className="text-ivory/85 mt-6 text-lg leading-relaxed md:text-xl">{club.today.text}</p>
        </div>
      </div>
    </section>
  );
}
