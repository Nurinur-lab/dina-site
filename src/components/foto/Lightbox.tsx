"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { LightboxItem } from "./types";

/**
 * Лайтбокс на нативном <dialog> (CLAUDE.md, раздел 6): фокус-ловушка и Esc —
 * из коробки. Поверх добавлены стрелки, счётчик «N из M» и свайп на мобильном.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
    } else if (index === null && dialog.open) {
      dialog.close();
    }
  }, [index]);

  const goTo = (next: number) => {
    const wrapped = (next + items.length) % items.length;
    onIndexChange(wrapped);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (index === null) return;
    if (event.key === "ArrowRight") goTo(index + 1);
    if (event.key === "ArrowLeft") goTo(index - 1);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || index === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    goTo(delta > 0 ? index - 1 : index + 1);
  };

  const item = index !== null ? items[index] : null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      aria-label="Просмотр фотографии"
      className="bg-night text-ivory m-0 h-dvh max-h-none w-screen max-w-none p-0 backdrop:bg-black/85"
    >
      {item && (
        <div
          className="flex h-full flex-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between px-4 py-4 md:px-8">
            <p className="text-mist text-sm">
              {(index ?? 0) + 1} из {items.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть просмотр"
              className="border-ivory/30 flex h-10 w-10 items-center justify-center border"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 md:px-20">
            <button
              type="button"
              onClick={() => goTo((index ?? 0) - 1)}
              aria-label="Предыдущая фотография"
              className="border-ivory/30 hover:border-ivory absolute left-2 flex h-10 w-10 items-center justify-center border md:left-6"
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            <div className="relative h-full max-h-[70vh] w-full max-w-4xl">
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="90vw"
                  className={`object-contain ${item.archival ? "grayscale-[85%] sepia-[8%]" : "saturate-[85%]"}`}
                />
              ) : (
                <div className="bg-night-2 flex h-full w-full items-center justify-center">
                  <span className="text-figure text-ivory/45 px-[8%] text-center text-6xl uppercase md:text-8xl">
                    {item.fallbackText}
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => goTo((index ?? 0) + 1)}
              aria-label="Следующая фотография"
              className="border-ivory/30 hover:border-ivory absolute right-2 flex h-10 w-10 items-center justify-center border md:right-6"
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          {(item.caption || item.credit) && (
            <div className="container-site flex flex-col gap-1 py-6 text-center">
              {item.caption && <p className="text-ivory/90">{item.caption}</p>}
              {item.credit && <p className="text-mist text-sm">{item.credit}</p>}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
