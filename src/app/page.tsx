import { club } from "@/lib/content";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-5xl md:text-7xl">{club.shortName}</h1>
      <p className="text-mist max-w-prose text-lg">{club.tagline}</p>
      <p className="text-mist text-sm">Главная страница — в фазе 2.</p>
    </main>
  );
}
