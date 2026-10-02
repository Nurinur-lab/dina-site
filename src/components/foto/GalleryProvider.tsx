"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Lightbox } from "./Lightbox";
import type { LightboxItem } from "./types";

const GalleryContext = createContext<{ open: (index: number) => void } | null>(null);

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("useGallery должен вызываться внутри GalleryProvider");
  return ctx;
}

/** Держит состояние открытого лайтбокса; сетка миниатюр рендерится сервером и приходит как children. */
export function GalleryProvider({
  items,
  children,
}: {
  items: LightboxItem[];
  children: ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <GalleryContext.Provider value={{ open: setIndex }}>
      {children}
      <Lightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </GalleryContext.Provider>
  );
}
