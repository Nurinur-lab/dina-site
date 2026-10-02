import { GhostWord } from "./GhostWord";

/** Заголовок внутренней страницы: H1, необязательное вступление и слово-«призрак» позади. */
export function PageHeader({
  title,
  intro,
  ghost,
}: {
  title: string;
  intro?: string;
  ghost?: string;
}) {
  return (
    <header className="container-site relative overflow-hidden pt-28 pb-14 md:pt-40 md:pb-20">
      {ghost && <GhostWord>{ghost}</GhostWord>}
      <h1 className="relative text-6xl md:text-8xl">{title}</h1>
      {intro && (
        <p className="text-ivory/85 relative mt-6 max-w-2xl text-lg leading-relaxed md:text-xl">
          {intro}
        </p>
      )}
    </header>
  );
}
