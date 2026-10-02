import { ArchivePhoto } from "@/components/ArchivePhoto";
import { Button } from "@/components/Button";
import { DiagonalStripe } from "@/components/DiagonalStripe";
import { GhostWord } from "@/components/GhostWord";
import { club } from "@/lib/content";
import { HeroReveal } from "./HeroReveal";

export function Hero() {
  return (
    <section aria-label="Представление клуба">
      <HeroReveal
        photo={<ArchivePhoto slotId="hero-main" sizes="100vw" priority fillParent />}
        ghost={<GhostWord>ДИНА</GhostWord>}
        stripe={<DiagonalStripe />}
        content={
          <>
            <p className="text-crown max-w-3xl text-lg font-medium md:text-xl">
              {club.displayFullName}
            </p>
            <h1 className="text-ivory text-[15vw] leading-[0.92] md:text-[9vw]">
              {club.shortName}
            </h1>
            <p className="text-ivory/90 max-w-xl text-lg md:text-2xl">{club.tagline}</p>
            <div>
              <Button variant="primary" href="/istoriya">
                История клуба
              </Button>
            </div>
          </>
        }
      />
    </section>
  );
}
