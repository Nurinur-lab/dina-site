import { Button } from "@/components/Button";
import { GhostWord } from "@/components/GhostWord";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center">
      <GhostWord>404</GhostWord>
      <h1 className="relative text-5xl md:text-7xl">Страница не найдена</h1>
      <p className="text-ivory/80 relative mt-4 max-w-md">
        Такой страницы нет — возможно, адрес устарел. История клуба никуда не делась.
      </p>
      <div className="relative mt-8">
        <Button variant="primary" href="/">
          На главную
        </Button>
      </div>
    </main>
  );
}
