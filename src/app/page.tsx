import { club } from "@/lib/content";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-bold">{club.shortName}</h1>
      <p className="text-mist max-w-prose">{club.tagline}</p>
      <p className="text-mist text-sm">
        Каркас проекта готов. Дизайн и разделы — в следующих фазах.
      </p>
    </main>
  );
}
