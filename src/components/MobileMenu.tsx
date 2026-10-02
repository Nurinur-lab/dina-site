"use client";

import Link from "next/link";
import { useRef } from "react";
import { mainNav } from "@/config/nav";

/** Полноэкранное мобильное меню на <dialog> — Esc и фокус-ловушка работают из коробки. */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="border-ivory/30 flex h-10 w-10 items-center justify-center border md:hidden"
        aria-label="Открыть меню"
      >
        <span className="sr-only">Меню</span>
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
          <path d="M0 1H18" stroke="currentColor" strokeWidth="1.5" />
          <path d="M0 7H18" stroke="currentColor" strokeWidth="1.5" />
          <path d="M0 13H18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Меню навигации"
        className="bg-night text-ivory m-0 h-dvh max-h-none w-screen max-w-none p-0 backdrop:bg-black/60"
      >
        <div className="flex h-full flex-col">
          <div className="container-site flex h-16 items-center justify-end">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="border-ivory/30 flex h-10 w-10 items-center justify-center border"
              aria-label="Закрыть меню"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <nav
            className="container-site flex flex-1 flex-col justify-center gap-6"
            aria-label="Основная навигация"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => dialogRef.current?.close()}
                className="text-figure text-ivory hover:text-pushkar text-4xl uppercase transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </dialog>
    </>
  );
}
