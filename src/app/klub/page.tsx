import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TodaySection } from "@/components/home/TodaySection";
import { ContactForm } from "@/components/klub/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { club } from "@/lib/content";
import { formatDateRu } from "@/lib/format";

const facts: Array<[string, string]> = [
  ["Основан", formatDateRu(club.foundingDate)],
  ["Основатель", club.founder],
  ["Прозвище", club.nickname],
  ["Город", club.city],
  ["Вид спорта", club.sport],
  ["Цвета клуба", club.clubColors],
];

export default function KlubPage() {
  const { email, phone, address, socials } = club.contacts;
  const hasContacts = email || phone || address || socials.length > 0;

  return (
    <main>
      <Breadcrumbs current="Клуб и контакты" />
      <PageHeader title="Клуб и контакты" intro={club.displayFullName} />

      <section aria-labelledby="about-heading" className="container-site pb-20 md:pb-28">
        <h2 id="about-heading" className="mb-8 text-4xl md:text-5xl">
          О клубе
        </h2>
        <dl className="divide-line grid max-w-2xl divide-y">
          {facts.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-6 py-4">
              <dt className="text-mist">{label}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <TodaySection />

      <section id="napisat" className="container-site scroll-mt-20 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-16">
          <div>
            <h2 className="mb-8 text-4xl md:text-5xl">Написать нам</h2>
            <ContactForm />
          </div>

          {hasContacts && (
            <div className="flex flex-col gap-2 text-sm md:pt-24">
              {email && (
                <a href={`mailto:${email}`} className="text-ivory/85 hover:text-ivory">
                  {email}
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="text-ivory/85 hover:text-ivory"
                >
                  {phone}
                </a>
              )}
              {address && <p className="text-ivory/85">{address}</p>}
              {socials.length > 0 && (
                <div className="mt-2 flex gap-4">
                  {socials.map((social) => (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ivory/85 hover:text-ivory"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
