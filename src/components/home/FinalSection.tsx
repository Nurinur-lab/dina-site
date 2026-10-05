import Image from "next/image";
import { Button } from "@/components/Button";
import { withBasePath } from "@/lib/base-path";
import { club } from "@/lib/content";

/** Блок 8 — «Финал». Большой логотип, полное название, слоган, контакты (если есть), ссылка на форму. */
export function FinalSection() {
  const { email, phone } = club.contacts;

  return (
    <section
      aria-labelledby="final-heading"
      className="container-site flex flex-col items-center gap-8 py-24 text-center md:py-32"
    >
      <Image
        src={withBasePath("/brand/logo-full.png")}
        alt=""
        width={120}
        height={180}
        className="h-32 w-auto md:h-40"
      />
      <div>
        <p id="final-heading" className="text-figure text-crown text-3xl md:text-5xl">
          {club.displayFullName}
        </p>
        <p className="text-ivory/80 mt-3 text-lg md:text-xl">{club.tagline}</p>
      </div>

      {(email || phone) && (
        <div className="text-mist flex flex-col gap-1 text-sm">
          {email && <a href={`mailto:${email}`}>{email}</a>}
          {phone && <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>}
        </div>
      )}

      <Button variant="secondary" href="/klub#napisat">
        Написать нам
      </Button>
    </section>
  );
}
