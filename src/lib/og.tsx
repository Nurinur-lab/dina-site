import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * Общий генератор OG-картинок (CLAUDE.md, раздел 8): next/og + шрифт с
 * кириллицей. Шрифт — тот же Fira Sans Extra Condensed, что и в вёрстке,
 * но зафиксирован локальным TTF-файлом (OFL-лицензия, взят из
 * github.com/google/fonts), а не загружается на лету: next/og выполняется
 * в рантайме сервера, и внешний запрос к Google при каждой генерации
 * картинки — лишняя точка отказа на российском VPS.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontsDir = path.join(process.cwd(), "src/assets/fonts");
const extraBold = fs.readFileSync(path.join(fontsDir, "FiraSansExtraCondensed-ExtraBold.ttf"));
const medium = fs.readFileSync(path.join(fontsDir, "FiraSansExtraCondensed-Medium.ttf"));

export function renderOgImage(title: string, subtitle?: string) {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0A0F1E",
        padding: "72px 80px",
        color: "#EEE9DF",
        fontFamily: "Fira Sans Extra Condensed",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 36,
          fontWeight: 800,
          color: "#F2C21B",
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        Дина
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ display: "flex", fontSize: 32, fontWeight: 500, color: "#9AA3B5" }}>
            {subtitle}
          </div>
        )}
      </div>

      <div style={{ display: "flex", height: 14, width: "100%" }}>
        <div style={{ flex: 1, backgroundColor: "#1F4FBF", display: "flex" }} />
        <div style={{ flex: 1, backgroundColor: "#F2C21B", display: "flex" }} />
        <div style={{ flex: 1, backgroundColor: "#1E8C45", display: "flex" }} />
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Fira Sans Extra Condensed", data: extraBold, weight: 800, style: "normal" },
        { name: "Fira Sans Extra Condensed", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
