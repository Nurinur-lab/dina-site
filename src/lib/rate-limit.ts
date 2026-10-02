/**
 * Лимит отправок формы — 5 в час с одного IP (CLAUDE.md, раздел 7).
 * Хранилище в памяти процесса: этого достаточно для одного инстанса приложения
 * (так и указано в задании); при горизонтальном масштабировании понадобится
 * внешнее хранилище (Redis и т. п.).
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

/** true, если лимит ещё не исчерпан (и засчитывает текущую попытку). */
export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  return true;
}
