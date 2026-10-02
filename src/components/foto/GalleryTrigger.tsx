"use client";

import type { ReactNode } from "react";
import { useGallery } from "./GalleryProvider";

export function GalleryTrigger({
  index,
  label,
  children,
  className = "",
}: {
  index: number;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const { open } = useGallery();

  return (
    <button
      type="button"
      onClick={() => open(index)}
      aria-label={label}
      className={`block w-full text-left ${className}`}
    >
      {children}
    </button>
  );
}
