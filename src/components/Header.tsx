import Image from "next/image";
import Link from "next/link";
import { mainNav } from "@/config/nav";
import { withBasePath } from "@/lib/base-path";
import { club } from "@/lib/content";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="border-line bg-night/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${club.shortName} — на главную`}
        >
          <Image
            src={withBasePath("/brand/logo-full.png")}
            alt=""
            width={30}
            height={44}
            className="h-10 w-auto md:h-11"
            priority
          />
          <span className="text-figure text-pushkar text-2xl md:text-3xl">{club.shortName}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ivory/85 hover:text-ivory text-sm font-medium tracking-wide uppercase transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
