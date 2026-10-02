"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const YM_ID = process.env.NEXT_PUBLIC_YM_ID;
const STORAGE_KEY = "dina-cookie-consent";

type Consent = "accepted" | "rejected";

/**
 * Яндекс.Метрика подключается только если задан NEXT_PUBLIC_YM_ID и только
 * после согласия в баннере (CLAUDE.md, раздел 8). Если YM_ID не задан, на
 * сайте нет необязательных (аналитических) cookie — спрашивать согласие не
 * на что, баннер не показывается вовсе.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!YM_ID) return;
    // Читаем localStorage только после монтирования на клиенте: на сервере его нет,
    // а немедленное чтение в lazy-инициализаторе useState рассинхронизировало бы
    // SSR- и клиентский рендер (hydration mismatch). Это разовая синхронизация с
    // внешним хранилищем при монтировании — обычный, ожидаемый случай использования эффекта.
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "accepted" || stored === "rejected") setConsent(stored);
    } catch {
      // localStorage недоступен (приватный режим и т. п.) — просто показываем баннер каждый раз.
    }
    setReady(true);
  }, []);

  if (!YM_ID) return null;

  function choose(value: Consent) {
    setConsent(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ничего страшного — просто не запомнится между визитами
    }
  }

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script id="yandex-metrica" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${YM_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element -- внешний пиксель, next/image здесь не нужен */}
            <img
              src={`https://mc.yandex.ru/watch/${YM_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </noscript>
        </>
      )}

      {ready && consent === null && (
        <div
          role="dialog"
          aria-label="Уведомление об использовании cookie"
          className="border-line bg-night-2 fixed inset-x-0 bottom-0 z-50 border-t p-4 md:p-6"
        >
          <div className="container-site flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-ivory/85 max-w-2xl text-sm">
              Мы используем технически необходимые cookie и, с вашего согласия, Яндекс.Метрику для
              статистики посещений. Подробнее — в{" "}
              <a href="/politika" className="text-pushkar underline underline-offset-2">
                политике конфиденциальности
              </a>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose("rejected")}
                className="border-ivory/30 px-4 py-2 text-sm"
              >
                Отклонить
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="bg-crown text-night px-4 py-2 text-sm font-medium uppercase"
              >
                Принять
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
