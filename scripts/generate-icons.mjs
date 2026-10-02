// Генерирует фавикон и apple-touch-icon: монограмма «Д» цветом --pushkar на
// --night (CLAUDE.md, раздел 5). Герб на 16px не читается, поэтому для мелких
// размеров используется геометрическая монограмма, а не растровый герб.
//
// Буква собрана из прямоугольников (без привязки к системным шрифтам), чтобы
// рендер был одинаковым на любой машине и в Docker-сборке.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const NIGHT = "#0A0F1E";
const PUSHKAR = "#F2C21B";

function buildSvg({ withBackground }) {
  const letter = `
    <g fill="${PUSHKAR}">
      <rect x="32" y="18" width="36" height="10" />
      <rect x="32" y="18" width="10" height="46" />
      <rect x="58" y="18" width="10" height="46" />
      <rect x="22" y="64" width="56" height="9" />
      <rect x="22" y="64" width="9" height="16" />
      <rect x="69" y="64" width="9" height="16" />
    </g>
  `;
  const background = withBackground ? `<rect width="100" height="100" fill="${NIGHT}" />` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Дина">${background}${letter}</svg>`;
}

const root = path.resolve(import.meta.dirname, "..");

async function main() {
  // icon.svg — фавикон. Next.js (App Router) сам отдаёт src/app/icon.svg как favicon.
  const iconSvg = buildSvg({ withBackground: true });
  await writeFile(path.join(root, "src/app/icon.svg"), iconSvg.trim() + "\n", "utf8");

  // apple-icon.png — 180×180, непрозрачный (iOS не любит прозрачность в touch-иконках).
  const appleSvg = buildSvg({ withBackground: true });
  const applePng = await sharp(Buffer.from(appleSvg)).resize(180, 180).png().toBuffer();
  await writeFile(path.join(root, "src/app/apple-icon.png"), applePng);

  // public/favicon.svg — на случай прямых ссылок/старых браузеров, которые не знают app/icon.svg.
  await mkdir(path.join(root, "public"), { recursive: true });
  await writeFile(path.join(root, "public/favicon.svg"), iconSvg.trim() + "\n", "utf8");

  console.log("Иконки сгенерированы: src/app/icon.svg, src/app/apple-icon.png, public/favicon.svg");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
