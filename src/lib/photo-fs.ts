import fs from "node:fs";
import path from "node:path";

/** Есть ли файл фото в public/photos/ — только для серверных компонентов. */
export function photoFileExists(file: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "photos", file));
}
