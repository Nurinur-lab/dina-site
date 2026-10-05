import Image from "next/image";
import Link from "next/link";
import { DiagonalStripe } from "./DiagonalStripe";
import { footerNav } from "@/config/nav";
import { withBasePath } from "@/lib/base-path";
import { club } from "@/lib/content";

export function Footer() {
  const { email, phone, socials } = club.contacts;
  const hasContacts = email || phone || socials.length > 0;

  return (
    <footer className="border-line mt-auto border-t">
      <DiagonalStripe />
      <div className="container-site flex flex-col gap-10 py-12 md:py-16">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={withBasePath("/brand/logo-full.png")}
              alt=""
              width={48}
              height={72}
              className="h-14 w-auto"
            />
            <div>
              <p className="text-figure text-crown text-xl md:text-2xl">{club.displayFullName}</p>
              <p className="text-mist mt-1 text-sm">{club.tagline}</p>
            </div>
          </div>

          <nav
            className="flex flex-col gap-2 text-sm md:items-end"
            aria-label="Навигация в подвале"
          >
            {footerNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-ivory/80 hover:text-ivory">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {hasContacts && (
          <div className="border-line flex flex-col gap-2 border-t pt-6 text-sm">
            {email && (
              <a href={`mailto:${email}`} className="text-ivory/80 hover:text-ivory">
                {email}
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="text-ivory/80 hover:text-ivory"
              >
                {phone}
              </a>
            )}
            {socials.length > 0 && (
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory/80 hover:text-ivory"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        <p className="text-mist text-xs">
          © {new Date().getFullYear()} {club.shortName}
        </p>
      </div>
    </footer>
  );
}
